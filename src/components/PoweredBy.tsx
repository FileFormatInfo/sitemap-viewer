import * as React from 'react';
import NextLink from 'next/link';
import Container from '@mui/material/Container';
import { grey } from '@mui/material/colors';
import { useTranslations } from 'next-intl';

function PoweredBy() {
    const t = useTranslations('ViewPage');
    return (
        <Container disableGutters={true} sx={{
            backgroundColor: grey[200],
            borderWidth: '1px',
            borderStyle: 'solid',
            borderColor: grey[300],
            borderRadius: 2,
            color: grey[900],
            paddingX: 1,
            paddingY: 0.5,
            opacity: 0.45,
            position: 'fixed',
            bottom: 0,
            mb: 2,
            width: 'fit-content',
            fontSize: '0.8rem',
        }}>
            <NextLink href="https://view.sitemap.style/"
                style={{ textDecoration: 'none', color: grey[900] }}
            >{t("poweredby")}</NextLink>
        </Container>
    );
}

export { PoweredBy };