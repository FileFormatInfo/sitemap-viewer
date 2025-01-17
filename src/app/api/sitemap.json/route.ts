import { handleJsonp } from '@/lib/handleJsonp';
import { loadSitemap } from '@/lib/loadSitemap';

export async function GET(request: Request) {
    const url = new URL(request.url);
    const url_str = url.searchParams.get("url") || "";

    const retVal = await loadSitemap(url_str);

    return handleJsonp(request, retVal);
}