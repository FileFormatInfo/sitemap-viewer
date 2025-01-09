/*
 * if there is a title, find it
 */

function findTitle(entry:any):string {

    // https://developers.google.com/search/docs/crawling-indexing/sitemaps/news-sitemap
    if (entry["news:news"]) {
        return entry["news:news"]["news:title"];
    }

    // https://developers.google.com/search/docs/crawling-indexing/sitemaps/video-sitemaps?hl=en
    if (entry["video:video"]) {
        return entry["video:video"]["video:title"];
    }

    // sitemap.style extension
    if (entry["style:title"]) {
        return entry["style:title"];
    }

    return "";
}

export {
    findTitle,
}