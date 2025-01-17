import { stripExtension } from "./stripExtension";

function extractTitle(localpath: string): string {
    const parts = localpath.split("/");
    const filename = parts[parts.length - 1];
    const title = stripExtension(decodeURIComponent(filename));
    return title;
}

export { extractTitle };
