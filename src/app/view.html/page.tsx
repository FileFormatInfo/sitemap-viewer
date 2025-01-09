import * as React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
//import NextLink from 'next/link';
import { TreeViewBaseItem } from '@mui/x-tree-view/models';

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
    const title = getFirst(urlParams['title'], 'Site Map');
    let url_str = getFirst(urlParams['url'], constants.RANDOM_VALID_URL);
    if (!url_str || url_str === constants.DEFAULT_SITEMAP_URL) {
        url_str = constants.RANDOM_VALID_URL;
    }

    const sme = await loadSitemap(url_str);
    const items = listToTree(sme.entries);
    return (
        <Container maxWidth="lg" sx={{ backgroundColor: '#ff0000', minHeight: '100vh' }}>
            <NavBar title={title} />
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    backgroundColor: '#00dd00'
                }}
            >
                {sme.success ? <SitemapTreeView items={items} /> : <h1>Failed to load sitemap</h1>}

            </Box>
        </Container>
    );
}

function listToTree(entries: SitemapEntry[]): TreeItem[] {

    entries.sort((a, b) => { return a.url.localeCompare(b.url); });


    const root: TreeItem[] = [];

    for (const entry of entries) {

        let parent: TreeItem[];
        parent = findOrCreateParents(root, entry.directory);

        let item = parent.find((item) => item.filename == entry.filename);
        if (item) {
            // this happens when a directory entry is found after a file entry from that directory
            item.id = entry.url;
            item.hasEntry = true;
            item.label = entry.name
            continue;
        } else {
            const item: TreeItem = {
                id: entry.url,
                filename: entry.filename,
                label: entry.name,
                children: [],
                hasEntry: true,
            };
            parent.push(item);
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
