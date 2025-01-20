import { XMLParser } from "fast-xml-parser";
import { errorMessage } from "./errorMessage";
import { stripDefaultPath } from "./stripDefaultPath";
import { stripExtension } from "./stripExtension";
import { findTitle } from "./findTitle";
import { SitemapData, SitemapEntry } from "./types";

async function loadSitemap(url_str: string):Promise<SitemapData> {
    const retVal: SitemapData = {
        success: false,
        errorCount: 0,
        messages: [],
        sitemaps: [],
        entries: [],
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
    const isFirst = retVal.sitemaps.length == 0;
    retVal.sitemaps.push(url_str);
    retVal.messages.push(`Fetching sitemap: ${url_str}`);

    const start = Date.now();

    let xml_resp: globalThis.Response;

    try {
        xml_resp = await fetch(url, {
            headers: {
                "User-Agent": `Sitemap.style/1.0 (your sitemap is being viewed on https://view.sitemap.style/ )`,
                Referer: `https://view.sitemap.style/`,
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
    const contentType = xml_resp.headers.get("Content-Type");
    retVal.messages.push(`Content type: ${contentType || "(null)"}`);
    if (!contentType) {
        retVal.errorCount++;
        retVal.messages.push("No content type provided.");
        return new_maps;
    }

    if (contentType.startsWith("text/plain")) {
        processTextSitemap(retVal, url_str, await xml_resp.text());
        return new_maps;
    }

    if (!contentType.startsWith("text/xml") && !contentType.startsWith("application/xml")) {
        retVal.messages.push("Invalid content type: " + contentType);
        if (isFirst) {
            //LATER: try to load URL from robots.txt
            retVal.messages.push("Attempting to load /sitemap.xml");
            url.pathname = "/sitemap.xml";
            new_maps.push(url.toString());
        } else {
            retVal.errorCount++;
        }
        return new_maps;
    }

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
    //console.log(`xml as json : ${JSON.stringify(xml_data)}`);

    if (xml_data.urlset) {
        processSitemap(retVal, url_str, xml_data);
    } else if (xml_data.sitemapindex) {
        retVal.messages.push("Processing sitemapindex");
        for (const sitemap of xml_data.sitemapindex.sitemap) {
            new_maps.push(sitemap.loc);
        }
    } else {
        retVal.errorCount++;
        retVal.messages.push("No urlset or sitemapindex found in XML.");
        return new_maps;
    }

    return new_maps;
}

function processTextSitemap(retVal: SitemapData, url_str: string, data: string) {
    const lines = data.split("\n");
    for (const line of lines) {
        const trimmed = line.trim();
        if (trimmed.length === 0 || trimmed.startsWith("#")) {
            continue;
        }
        if (!trimmed.startsWith("http://") && !trimmed.startsWith("https://")) {
            retVal.errorCount++;
            retVal.messages.push(`Invalid URL protocol in text sitemap: "${trimmed}"`);
            continue;
        }

        processPageUrl(retVal, url_str, trimmed, null);
    }
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
        processPageUrl(retVal, sitemap, entry.loc, entry);
    }
}

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
function processPageUrl(retVal:SitemapData, sitemap:string, unparsed_url:string, entry: any) {
    let full_url: string;
    let parsed_url: URL;
    try {
        parsed_url = new URL(unparsed_url, sitemap);
        full_url = parsed_url.href;
    } catch (err: unknown) {
        retVal.errorCount++;
        retVal.messages.push(
            `Unable to parse URL "${entry.loc}": ${errorMessage(err)}`
        );
        return;
    }
    let localpath = `${parsed_url.pathname}${parsed_url.search}`;
    localpath = stripDefaultPath(localpath);
    if (localpath.length > 1 && localpath.endsWith("/")) {
        localpath = localpath.slice(0, -1);
    }
    let name: string = entry ? findTitle(entry) : "";
    if (!name) {
        if (localpath === "/") {
            name = "";
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

export {
    loadSitemap,
}
