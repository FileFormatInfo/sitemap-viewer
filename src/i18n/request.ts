import { getRequestConfig } from "next-intl/server";
import { cookies } from "next/headers";
import { defaultLocale } from "./config";

export default getRequestConfig(async () => {

    let locale = (await cookies()).get('locale')?.value;
    if (!locale) {
        console.log('locale not found in cookie');
        //const headers = await headers();
        locale = defaultLocale;
    }

    console.log('locale in getRequestConfig', locale);

    return {
        locale,
        messages: (await import(`../../messages/${locale}.json`)).default,
    };
});
