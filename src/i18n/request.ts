import { getRequestConfig } from "next-intl/server";
import { cookies, headers } from "next/headers";
import { defaultLocale, locales } from "./config";
import { match } from "@formatjs/intl-localematcher";
import { addError } from "@/lib/errorLog";

async function getHeaderLocale(): Promise<string | undefined> {
    const accepted_str = (await headers()).get('accept-language');
    if (!accepted_str) {
        return;
    }

    try {
        const accepted = accepted_str.split(',').map((str) => {
            const [locale] = str.split(';q=');
            return locale;
            //return [locale, parseFloat(q || '1')];
        });

        const supported = match(locales, accepted, 'en');
        if (supported && supported.length > 0) {
            return supported[0];
        }
    } catch (err:unknown) {
        console.log('ERROR: unable to parse accept-language header', err, accepted_str);
        addError({
            catcher: 'getHeaderLocale',
            message: 'unable to parse accept-language header',
            err: err instanceof Error ? err : undefined,
            data: { accepted_str },
        })
    }
    return;
}

export default getRequestConfig(async () => {

    let locale = (await cookies()).get('locale')?.value;
    if (!locale) {
        console.log('locale not found in cookie');  // very common
        locale = await getHeaderLocale();
    }

    if (!locale) {
        console.log('locale not found in header (!)');  // should never happen for real browsers
        locale = defaultLocale;
    }

    console.log('locale in getRequestConfig', locale);

    return {
        locale,
        messages: (await import(`../../messages/${locale}.json`)).default,
    };
});
