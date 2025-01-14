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
import TransformSelect from '@/components/TransformSelect';
import FormGroup from '@mui/material/FormGroup';

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
                        helperText="Defaults to root of sitemap.xml URL"
                        id="return"
                        label="Return URL (optional)"
                        name="exit"
                        sx={{ mt: 2 }}
                        defaultValue=""
                    />
                    <SortSelect />
                    <TransformSelect />
                    <FormGroup sx={{mt: 2}}>
                        <FormControlLabel control={<Checkbox name="showmode" value="1" defaultChecked />} label="Show Light/Dark Tool" />
                    </FormGroup>
                    <FormGroup sx={{ mt: 1 }}>
                        <FormControlLabel control={<Checkbox name="showdebug" value="1" />} label="Show Logging Tool" />
                    </FormGroup>
                    <FormGroup sx={{ mt: 1 }}>
                        <FormControlLabel control={<Checkbox name="showexit" value="1" defaultChecked />} label="Show Exit Tool" />
                    </FormGroup>
                    <Stack direction="row" spacing={2} justifyContent="flex-start" sx={{ mt: 2 }}>
                        <Button color="success" variant="contained" type="submit">
                            View
                        </Button>
                        <Button color="success" variant="outlined" component={NextLink} href="https://www.sitemap.style/">
                            Cancel
                        </Button>
                        <Stack direction="row" flex="1" justifyContent="flex-end" spacing={2} sx={{backgroundColor: 'transparent'}}>
                            <Button component={NextLink} variant="contained" href="/view.html?url=https://www.regex.zone/sitemap.xml&title=Regex+Zone+Site+Map&sort=name">
                                Demo
                            </Button>
                        </Stack>
                    </Stack>
                </form>
                <ProTip />
                <Copyright />
            </Box>
        </Container>
    );
}
