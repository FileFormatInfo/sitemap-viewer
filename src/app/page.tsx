import * as React from 'react';
import { Metadata } from 'next/types';
import NextLink from 'next/link';
import { useTranslations } from 'next-intl';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';

import { constants } from '@/lib/constants';
import SortSelect from '@/components/SortSelect';
import TransformSelect from '@/components/TransformSelect';
import ProTip from '@/components/ProTip';
import Copyright from '@/components/Copyright';
import LocaleButton from '@/components/LocaleButton';


export const metadata: Metadata = {
    description: 'Mobile-friendly web application to view sitemap.xml files',
    icons: [{
        url: '/favicon.svg',
        type: 'image/svg+xml',
    }],
}

export default function Home() {
    const t = useTranslations('HomePage');

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
                <Stack direction="row" spacing={2} sx={{ display: "flex", mb: 2, width: '100%' }}>
                    <Typography variant="h4" component="h1" sx={{ flexGrow: 1, textAlign: 'center' }}>
                        {t("title")}
                    </Typography>
                    <LocaleButton />
                </Stack>
                <form action="/view.html" method="get" style={{ width: '100%' }}>
                    <TextField
                        fullWidth
                        id="url"
                        label={t("url_label")}
                        name="url"
                        sx={{ mt: 2 }}
                        defaultValue={constants.DEFAULT_SITEMAP_URL}
                    />
                    <TextField
                        fullWidth
                        helperText={t("return_help")}
                        id="return"
                        label={t("return_label")}
                        name="exit"
                        sx={{ mt: 2 }}
                        defaultValue=""
                    />
                    <SortSelect />
                    <TransformSelect />
                    <FormGroup sx={{ mt: 2 }}>
                        <FormControlLabel control={<Checkbox name="showmode" value="1" defaultChecked />} label={t("show_mode_label")} />
                    </FormGroup>
                    <FormGroup sx={{ mt: 1 }}>
                        <FormControlLabel control={<Checkbox name="showdebug" value="1" />} label={t("show_log_label")} />
                    </FormGroup>
                    <FormGroup sx={{ mt: 1 }}>
                        <FormControlLabel control={<Checkbox name="showlanguage" value="1" defaultChecked />} label={t("show_language_label")} />
                    </FormGroup>
                    <FormGroup sx={{ mt: 1 }}>
                        <FormControlLabel control={<Checkbox name="showexit" value="1" defaultChecked />} label={t("show_exit_label")} />
                    </FormGroup>
                    <Stack direction="row" spacing={2} justifyContent="flex-start" sx={{ mt: 2 }}>
                        <Button color="success" variant="contained" type="submit">
                            {t("view_button")}
                        </Button>
                        <Button color="success" variant="outlined" component={NextLink} href="https://www.sitemap.style/">
                            {t("cancel_button")}
                        </Button>
                        <Stack direction="row" flex="1" justifyContent="flex-end" spacing={2} sx={{ backgroundColor: 'transparent' }}>
                            <Button component={NextLink} variant="contained" href={`/view.html?url=${encodeURIComponent(constants.DEMO_URL)}&showmode=1&showlanguage=1&showexit=1&sort=name&return=/&showexit=1`}>
                                {t("demo_button")}
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
