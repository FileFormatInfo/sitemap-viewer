import Stack from '@mui/material/Stack'
import NextLink from 'next/link'

export default function NotFound() {
    return (
        <Stack justifyContent="center" alignItems="center" sx={{height: '100vh', width: '100vw'}}>
            <h2>Page Not Found</h2>
            <p>Could not find requested resource</p>
            <NextLink href="/">Home</NextLink>
        </Stack>
    )
}