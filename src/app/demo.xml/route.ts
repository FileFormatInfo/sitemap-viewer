type SitemapEntry = {
    loc: string;
};

export function GET() {
    const urls: SitemapEntry[] = [
        { loc: "/" },
        { loc: "/contact.html" },
        { loc: "/support/index.html" },
        { loc: "/support/faq.html" },
        { loc: "/support/tips-and-tricks.html" },
        { loc: "/docs/getting-starting.html" },
        { loc: "/support/glossary.html" },
        { loc: "/overview.html" },
    ];

    const thisYear = new Date().getFullYear();
    const thisMonth = new Date().getMonth() + 1;
    for (let year = thisYear - 3; year <= thisYear; year++) {
        for (let month = 1; month <= 12; month++) {
            if (year == thisYear && month > thisMonth) {
                break;
            }
            urls.push({ loc: `/posts/${year}/${month}/` });
        }
    }

    const xmlStr = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${urls
        .map((entry) => `\t<url>\n\t\t<loc>https://demo.xml.style${entry.loc}</loc>\n</url>\n`)
        .join("\n")}
</urlset>
    `;

    return new Response(xmlStr, {
        headers: {
            "Content-Type": "text/xml; charset=utf-8",
        },
    });
}
