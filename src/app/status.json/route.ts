export function GET(request: Request) {
    const jsonStr = JSON.stringify({
        success: true,
        message: "OK",
        timestamp: new Date().toISOString(),
        tech: `NodeJS ${process.version}`,
        lastmod: process.env.LASTMOD || "(not set)",
        commit: process.env.COMMIT || "(not set)",
    });

    const u = new URL(request.url);
    const callback = u.searchParams.get("callback");
    if (callback && /^[a-zA-Z_][a-zA-Z0-9_]*$/.test(callback)) {
        return new Response(`${callback}(${jsonStr});`, {
            headers: {
                "Content-Type": "text/javascript; charset=utf-8",
            },
        });
    } else {
        return new Response(jsonStr, {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "POST, GET",
                "Access-Control-Max-Age": "604800",
                "Content-Type": "application/json; charset=utf-8",
            },
        });
    }
}
