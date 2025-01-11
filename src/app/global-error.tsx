'use client' // Error boundaries must be Client Components

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
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