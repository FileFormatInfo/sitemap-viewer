'use client'
import { useEffect } from "react";

 // Error boundaries must be Client Components

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error);
        fetch('/api/errorlog.json', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                catcher: 'global-error.tsx',
                message: error.message,
                data: { err: error, digest: error.digest }
            }),
        });
    }, [error])

    console.log('ERROR: global uncaught error', error);
    return (
        // global-error must include html and body tags
        <html>
            <body>
                <h2>Something went wrong! (global-error)</h2>
                <button onClick={() => reset()}>Try again</button>
            </body>
        </html>
    )
}