import * as React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

import SitemapTreeView from '@/components/SitemapTreeView';
import NavBar from '@/components/NavBar';
import { constants } from '@/lib/constants';
import { getFirst } from '@/lib/getFirst';
import { loadSitemap } from '@/lib/loadSitemap';
import { SitemapEntry, TreeItem } from '@/lib/types';
import PoweredBy from '@/components/PoweredBy';
import { DEFAULT_TRANSFORM, getTransform } from '@/components/TransformSelect';

export default async function View({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {

    const urlParams = (await searchParams);
    const showDebug = getFirst(urlParams['showdebug'], '0') === '1';
    const showMode = getFirst(urlParams['showmode'], '0') === '1';
    const title = getFirst(urlParams['title'], 'Site Map');
    const home = getFirst(urlParams['home'], 'Home');
    let url_str = getFirst(urlParams['url'], constants.RANDOM_VALID_URL);
    if (!url_str || url_str === constants.DEFAULT_SITEMAP_URL) {
        url_str = constants.RANDOM_VALID_URL;
    }
    const sort = getFirst(urlParams['sort'], 'original');
    let exitUrl = getFirst(urlParams['exiturl'], '');
    if (exitUrl == '') {
        const defaultUrl = new URL(url_str);
        defaultUrl.pathname = '/';
        exitUrl = defaultUrl.toString();
    }

    const sme = await loadSitemap(url_str, { home });
    if (sort == "url") {
        sme.entries.sort((a, b) => { return a.url.localeCompare(b.url); });
    }
    const items = listToTree(sme.entries);
    const transformer = getTransform(getFirst(urlParams['transform'], DEFAULT_TRANSFORM));
    if (transformer) {
        transform(items, transformer);
    }
    if (sort == "name") {
        sortTreeName(items);
    } else if (sort == "dirfirst") {
        sortTreeDirFirst(items);
    }
    return (
        <>
        <Container maxWidth={false} disableGutters={true} sx={{ minHeight: '100vh' }}>
                <NavBar debug={showDebug} messages={sme.messages} mode={showMode} title={title} exitUrl={exitUrl} />
            <Container
                maxWidth="lg"
                disableGutters={true}
                    sx={{ alignItems: "center", display: "flex", flexDirection: "column", justifyContent: "top",minHeight: '100vh' }}
                >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: '100%',
                    }}
                >
                    {sme.success ? <SitemapTreeView items={items} /> : <h1>Failed to load sitemap</h1>}
                </Box>
                <PoweredBy />
            </Container>
        </Container>
        </>

    );
}

function transform(items: TreeItem[], transformer: (s: string) => string) {
    for (const item of items) {
        item.label = transformer(item.label);
        if (item.children.length > 0) {
            transform(item.children, transformer);
        }
    }
}

function sortTreeName(items: TreeItem[]) {
    if (items.length == 0) {
        return;
    }
    if (items.length > 1) {
        items.sort((a, b) => a.label.localeCompare(b.label));
    }

    for (const item of items) {
        sortTreeName(item.children);
    }
}

function sortTreeDirFirst(items: TreeItem[]) {
    if (items.length == 0) {
        return;
    }
    if (items.length > 1) {
        items.sort((a, b) => {
            if (a.children.length > 0 && b.children.length == 0) {
                return -1;
            } else if (a.children.length == 0 && b.children.length > 0) {
                return 1;
            }
            return a.label.localeCompare(b.label)
        });
    }

    for (const item of items) {
        sortTreeDirFirst(item.children);
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
