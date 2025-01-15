import * as React from 'react';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '@/theme';
import InitColorSchemeScript from '@mui/material/InitColorSchemeScript';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';

export default async function RootLayout(props: { children: React.ReactNode }) {

    const locale = await getLocale();
    console.log('RootLayout locale', locale);
    const messages = await getMessages();

    return (
        <html lang={locale} suppressHydrationWarning style={{ minHeight: '100vh' }}>
            <body style={{ minHeight: '100vh' }}>
                <NextIntlClientProvider messages={messages}>
                    <InitColorSchemeScript attribute="class" />
                    <AppRouterCacheProvider options={{ enableCssLayer: true }}>
                        <ThemeProvider theme={theme}>
                            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                            <CssBaseline />
                            {props.children}
                        </ThemeProvider>
                    </AppRouterCacheProvider>
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
