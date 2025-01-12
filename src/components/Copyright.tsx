import * as React from 'react';
import Typography from '@mui/material/Typography';
import NextLink from 'next/link';

export default function Copyright() {
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
                Contact
            </NextLink>
            {' | '}
            <NextLink color="inherit" href="https://github.com/fileformat/view.sitemap.style">
                Source
            </NextLink>
        </Typography>
    );
}
