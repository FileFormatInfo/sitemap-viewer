import * as React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

import SitemapTreeView from '@/components/SitemapTreeView';
import NavBar from '@/components/NavBar';
import { constants } from '@/lib/constants';
import { getFirst } from '@/lib/getFirst';
import { loadSitemap } from '@/lib/loadSitemap';
import { SitemapEntry, TreeItem } from '@/lib/types';

export default async function View({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {

    const urlParams = (await searchParams);
    const debug = getFirst(urlParams['debug'], '0') === '1';
    const title = getFirst(urlParams['title'], 'Site Map');
    let url_str = getFirst(urlParams['url'], constants.RANDOM_VALID_URL);
    if (!url_str || url_str === constants.DEFAULT_SITEMAP_URL) {
        url_str = constants.RANDOM_VALID_URL;
    }
    const sort = getFirst(urlParams['sort'], 'original');

    const sme = await loadSitemap(url_str);
    if (sort == "url") {
        sme.entries.sort((a, b) => { return a.url.localeCompare(b.url); });
    }
    const items = listToTree(sme.entries);
    if (sort == "name") {
        sortTree(items);
    }
    return (
        <Container maxWidth="lg" disableGutters={true} sx={{ minHeight: '100vh' }}>
            <NavBar debug={debug} title={title} exitUrl="/" />
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                {sme.success ? <SitemapTreeView items={items} /> : <h1>Failed to load sitemap</h1>}
            </Box>
        </Container>
    );
}

function sortTree(items: TreeItem[]) {
    if (items.length == 0) {
        return;
    }
    if (items.length > 1) {
        items.sort((a, b) => a.label.localeCompare(b.label));
    }

    for (const item of items) {
        sortTree(item.children);
    }
}

function listToTree(entries: SitemapEntry[]): TreeItem[] {

    const root: TreeItem[] = [];

    for (const entry of entries) {

        const parent = findOrCreateParents(root, entry.directory);

        const item = parent.find((item) => item.filename == entry.filename);
        if (item) {
            // this happens when a directory entry is found after a file entry from that directory
            item.id = entry.url;
            item.hasEntry = true;
            item.label = entry.name
        } else {
            const new_item: TreeItem = {
                id: entry.url,
                filename: entry.filename,
                label: entry.name,
                children: [],
                hasEntry: true,
            };
            parent.push(new_item);
        }
    }
    return root;
}

function findOrCreateParent(
    parent: TreeItem[],
    fullpath: string,
    directory: string
): TreeItem[] {
    let item = parent.find((item) => item.filename == directory);
    if (item) {
        return item.children as TreeItem[];
    }
    item = {
        id: `local:${fullpath}`,
        filename: directory || "indirect should not occur",
        label: `${directory}`, // (indirect id=${fullpath})`,
        children: [],
        hasEntry: false,
    };
    parent.push(item);
    return item.children as TreeItem[];
}

function findOrCreateParents(parent: TreeItem[], paths: string[]): TreeItem[] {
    if (paths.length == 0) {
        return parent;
    }

    for (let index = 0; index < paths.length; index++) {
        const fullpath = `/${paths.slice(0, index + 1).join("/")}/`;
        const directory = paths[index];
        parent = findOrCreateParent(parent, fullpath, directory);
    }
    return parent;
}
