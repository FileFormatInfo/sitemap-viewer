import * as React from 'react';
import { useTranslations } from 'next-intl';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import NextLink from 'next/link';
import { MdHome } from 'react-icons/md';

import LocaleButton from '@/components/LocaleButton';

export default function AdminLayout(props: { children: React.ReactNode }) {
    const t = useTranslations('ManagePage');

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
                    <NextLink href="/manage/" style={{color: "primary" }} >
                        <span style={{color: 'primary'}}>
                            <MdHome size={36} color="primary" />
                        </span>
                    </NextLink>
                    <Typography variant="h4" component="h1" sx={{ flexGrow: 1, textAlign: 'center' }}>
                        {t('title')}
                    </Typography>
                    <LocaleButton />
                </Stack>
                {props.children}
            </Box>
        </Container>
    );
}