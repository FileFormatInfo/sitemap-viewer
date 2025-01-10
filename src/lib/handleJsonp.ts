function handleJsonp(request: Request, data: unknown):Response {
    const jsonStr = JSON.stringify(data); //, null, 2);
    let body: string;
    const headers:HeadersInit = {};

    const me = new URL(request.url);
    const callback = me.searchParams.get("callback");
    if (callback) {
        headers["Content-Type"] = "application/javascript";
        body = `${callback}(${jsonStr})`;
    } else {
        headers["Access-Control-Allow-Origin"] = "*";
        headers["Access-Control-Allow-Methods"] = "POST, GET";
        headers["Access-Control-Max-Age"] = "604800";
        headers["Content-Type"] = "application/json";
        body = jsonStr;
    }

    return new Response(body, {
        headers: {
            ...headers,
            "Cache-Control": "no-store, max-age=0",
            "X-Robots-Tag": "nofollow, noindex",
        },
    });
}

export {
    handleJsonp,
}
