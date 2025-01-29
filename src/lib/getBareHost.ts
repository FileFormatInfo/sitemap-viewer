

// get the hostname (without www) from a URL string
export function getBareHost(url: string): string {
    const host = new URL(url).hostname;
    return host.replace(/^www\./, '');
}