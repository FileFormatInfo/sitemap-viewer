const defaultPaths: Set<String> = new Set([
    "default.htm",
    "default.html",
    "index.htm",
    "index.html",
]);

function stripDefaultPath(path: string): string {

    const parts = path.split("/");
    const lastEntry = parts[parts.length - 1];

    if (defaultPaths.has(lastEntry)) {
        return parts.slice(0, parts.length - 1).join("/");
    }

    return path;
}

export { stripDefaultPath };