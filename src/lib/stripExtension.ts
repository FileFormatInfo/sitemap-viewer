const extensions: Set<String> = new Set([
    "htm",
    "html",
    "txt",
    "xhtml",
    "xml",
]);

function stripExtension(path: string): string {
    const parts = path.split(".");
    const extension = parts[parts.length - 1].toLowerCase();

    if (extensions.has(extension)) {
        return parts.slice(0, parts.length - 1).join(".");
    }

    return path;
}

export {
    stripExtension,
}
