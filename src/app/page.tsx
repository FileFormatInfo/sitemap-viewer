import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import NextLink from 'next/link';
import ProTip from '@/components/ProTip';
import Copyright from '@/components/Copyright';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { constants } from '@/lib/constants';

export default function Home() {
    return (
        <Container maxWidth="md">
            <Box
                sx={{
                    my: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
                    <NextLink href="https://www.sitemap.style/">Sitemap.Style</NextLink>'s
                    Sitemap Viewer
                </Typography>
                <form action="/view.html" method="get" style={{ width: '100%' }}>
                    <TextField
                        fullWidth
                        id="url"
                        label="URL of your sitemap.xml"
                        name="url"
                        sx={{ mt: 6 }}
                        defaultValue={constants.DEFAULT_SITEMAP_URL}
                    />
                    <Stack direction="row" spacing={2} justifyContent="center" sx={{ mt: 2 }}>
                        <Button variant="contained" type="submit">
                            View
                        </Button>
                        <Button variant="outlined" component={NextLink} href="https://www.sitemap.style/">
                            Cancel
                        </Button>
                    </Stack>
                </form>
                <ProTip />
                <Copyright />
            </Box>
        </Container>
    );
}
