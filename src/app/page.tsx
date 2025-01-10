import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import NextLink from 'next/link';
import ProTip from '@/components/ProTip';
import Copyright from '@/components/Copyright';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import { constants } from '@/lib/constants';
import SortSelect from '@/components/SortSelect';

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
                    Sitemap Viewer
                </Typography>
                <form action="/view.html" method="get" style={{ width: '100%' }}>
                    <TextField
                        fullWidth
                        id="url"
                        label="URL of your sitemap.xml"
                        name="url"
                        sx={{ mt: 2 }}
                        defaultValue={constants.DEFAULT_SITEMAP_URL}
                    />
                    <TextField
                        fullWidth
                        id="title"
                        label="Title (optional)"
                        name="title"
                        sx={{ mt: 2 }}
                        defaultValue={constants.DEFAULT_TITLE}
                    />
                    <TextField
                        fullWidth
                        id="exit"
                        label="Exit destination URL (optional)"
                        name="exit"
                        sx={{ mt: 2 }}
                        defaultValue="/"
                    />
                    <SortSelect />
                    <FormControlLabel control={<Checkbox name="debug" value="1" defaultChecked />} label="Debugging" />
                    <Stack direction="row" spacing={2} justifyContent="flex-start" sx={{ mt: 2 }}>
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
