import { XMLParser } from "fast-xml-parser";
import { errorMessage } from "./errorMessage";
import { stripDefaultPath } from "./stripDefaultPath";
import { stripExtension } from "./stripExtension";
import { findTitle } from "./findTitle";
import { SitemapData, SitemapEntry } from "./types";

async function loadSitemap(url_str: string, translations:{[key:string]:string}):Promise<SitemapData> {
    const retVal: SitemapData = {
        success: false,
        errorCount: 0,
        messages: [],
        sitemaps: [],
        entries: [],
        translations,
    };

    if (!url_str) {
        retVal.errorCount++;
        retVal.messages.push("No ?url= parameter provided.");
        return retVal;
    }

    const urls = [url_str];

    while (urls.length > 0) {
        const new_maps = await processUrl(retVal, urls.shift() as string);
        if (new_maps.length > 0) {
            urls.push(...new_maps);
        }
    }

    retVal.success = retVal.errorCount === 0;
    return retVal;
};

/*
 * URL could be either a sitemap or a sitemapindex
 */
async function processUrl(
    retVal: SitemapData,
    url_str: string
): Promise<string[]> {
    const new_maps: string[] = [];

    let url: URL;
    try {
        url = new URL(url_str);
    } catch (err: unknown) {
        retVal.errorCount++;
        retVal.messages.push(errorMessage(err));
        return new_maps;
    }
    retVal.sitemaps.push(url_str);
    retVal.messages.push(`Fetching sitemap: ${url_str}`);

    const start = Date.now();

    let xml_resp: globalThis.Response;

    try {
        xml_resp = await fetch(url, {
            headers: {
                "User-Agent": `Sitemap.style/1.0 (your sitemap is being processed at https://www.sitemap.style/ )`,
                Referer: `https://www.sitemap.style/api/sitemap.json`,
            },
        });

        if (!xml_resp.ok) {
            retVal.success = false;
            retVal.messages.push(
                "Failed to fetch sitemap: " + xml_resp.statusText
            );
            return new_maps;
        }
    } catch (err: unknown) {
        retVal.errorCount++;
        retVal.messages.push(errorMessage(err));
        return new_maps;
    }
    retVal.messages.push("Fetched url in " + (Date.now() - start) + "ms.");
    retVal.messages.push(
        `Content length: ${xml_resp.headers.get("Content-Length")}`
    );
    retVal.messages.push(
        `Content type: ${xml_resp.headers.get("Content-Type")}`
    );

    const xml_str = await xml_resp.text();
    retVal.messages.push(`JS string length: ${xml_str.length}`);

    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    let xml_data: any;
    const parser = new XMLParser();
    try {
        xml_data = parser.parse(xml_str);
    } catch (err: unknown) {
        retVal.errorCount++;
        retVal.messages.push(errorMessage(err));
        return new_maps;
    }
    console.log(`xml as json : ${JSON.stringify(xml_data)}`);

    if (xml_data.urlset) {
        processSitemap(retVal, url_str, xml_data);
    } else {
        retVal.messages.push("Processing sitemapindex");
        for (const sitemap of xml_data.sitemapindex.sitemap) {
            new_maps.push(sitemap.loc);
        }
    }

    return new_maps;
}

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
function processSitemap(retVal: SitemapData, sitemap: string, data: any) {
    if (!data.urlset.url) {
        retVal.errorCount++;
        retVal.messages.push("No url entries found in sitemap.");
        return;
    }
    if (!Array.isArray(data.urlset.url)) {
        retVal.messages.push("Converting single URL to array.");
        data.urlset.url = [data.urlset.url];
    }

    for (const entry of data.urlset.url) {
        let full_url: string;
        let parsed_url: URL;
        try {
            parsed_url = new URL(entry.loc, sitemap);
            full_url = parsed_url.href;
        } catch (err: unknown) {
            retVal.errorCount++;
            retVal.messages.push(
                `Unable to parse URL "${entry.loc}": ${errorMessage(err)}`
            );
            continue;
        }
        let localpath = `${parsed_url.pathname}${parsed_url.search}`;
        localpath = stripDefaultPath(localpath);
        if (localpath.length > 1 && localpath.endsWith("/")) {
            localpath = localpath.slice(0, -1);
        }
        let name: string = findTitle(entry);
        if (!name) {
            if (localpath === "/") {
                name = retVal.translations['home'] || "Home";
            } else {
                const parts = localpath.split("/");
                name = stripExtension(
                    decodeURIComponent(parts[parts.length - 1])
                );
            }
        }
        const directory = localpath.split("/");
        directory.shift(); // remove empty string from leading slash
        const filename = directory.pop() || "";

        const new_entry: SitemapEntry = {
            url: full_url,
            directory,
            filename,
            name,
            lastmod: entry.lastmod,
            priority: entry.priority,
        };
        retVal.entries.push(new_entry);
    }
}

export {
    loadSitemap,
}
