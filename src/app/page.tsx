import * as React from 'react';
import { Metadata } from 'next/types';
import { useTranslations } from 'next-intl';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

import ProTip from '@/components/ProTip';
import Copyright from '@/components/Copyright';
import LocaleButton from '@/components/LocaleButton';
import ConfigForm from '@/components/ConfigForm';


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
                <ConfigForm />
                <ProTip />
                <Copyright />
            </Box>
        </Container>
    );
}
