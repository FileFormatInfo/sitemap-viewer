type SitemapEntry = {
    url: string; // full url
    directory: string[]; // where it will be displayed in the tree
    filename: string; // filename, parsed from url
    name: string; // displayed name, parsed from url (or sitemap extension)
    lastmod: string;
    priority: string;
};

type SitemapData = {
    success: boolean;
    errorCount: number;
    messages: string[];
    sitemaps: string[];
    entries: SitemapEntry[];
    translations: { [key: string]: string };
};

type TreeItem = {
    id: string; // url if hasEntry, otherwise localpath
    label: string;
    filename: string;
    hasEntry: boolean; // if false, it's a directory that does not have its own entry and thus should not be hyperlinked
    children: TreeItem[];
    //childMap: { [key: string]: TreeItem };
};

export type {
    SitemapData,
    SitemapEntry,
    TreeItem,
}