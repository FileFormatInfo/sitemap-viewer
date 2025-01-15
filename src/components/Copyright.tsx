import * as React from 'react';
import Typography from '@mui/material/Typography';
import NextLink from 'next/link';
import { useTranslations } from 'next-intl';

export default function Copyright() {
    const t = useTranslations('Footer');
    return (
        <Typography
            variant="body2"
            align="center"
            sx={{
                color: 'text.secondary',
            }}
        >
            Copyright © 2025 Andrew Marcuse. All Rights Reserved.
            {' | '}
            <NextLink color="inherit" href="https://andrew.marcuse.info/contact.html">
                {t('contact_link')}
            </NextLink>
            {' | '}
            <NextLink color="inherit" href="https://github.com/fileformat/view.sitemap.style">
                {t('source_link')}
            </NextLink>
        </Typography>
    );
}
