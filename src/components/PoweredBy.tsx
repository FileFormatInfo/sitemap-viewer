import * as React from 'react';
import NextLink from 'next/link';
import Container from '@mui/material/Container';

export default function PoweredBy() {
    return (
        <Container disableGutters={true} sx={{
            backgroundColor: '#eee',
            border: '1px solid #ddd',
            borderRadius: 2,
            paddingX: 1,
            paddingY: 0.5,
            opacity: 0.45,
            position: 'fixed',
            bottom: 0,
            mb: 2,
            width: 'fit-content',
            fontSize: '0.8rem',
        }}>
            {'Powered by '}
            <NextLink href="https://www.sitemap.style/">Sitemap.Style</NextLink>
        </Container>
    );
}
