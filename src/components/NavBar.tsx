import * as React from 'react';
import NextLink from 'next/link';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { MdLogout, MdMap } from 'react-icons/md';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import DebugButton from './DebugButton';
import ModeButton from './ModeButton';

type NavBarProps = {
    debug: boolean,
    exit: boolean,
    messages: string[],
    mode: boolean,
    returnUrl: string,
    title: string,
}

export default function NavBar({ debug, exit, messages, mode, returnUrl, title }: NavBarProps) {
    return (
        <AppBar position="static" id="back-to-top-anchor" >
            <Container maxWidth="lg" disableGutters={true}>
                <Toolbar sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
                    <Stack direction="row" spacing={2} sx={{ alignItems: 'center'}}>
                        <NextLink href={returnUrl} >
                            <MdMap size={32} color="white"/>
                        </NextLink>
                        <Typography variant="h6" component="div" >
                            {title}
                        </Typography>
                    </Stack>
                    <Stack direction="row" spacing={2}>
                        {mode ? <ModeButton /> : null}
                        {debug ? <DebugButton messages={messages} /> : null}
                        {exit ? <NextLink href={returnUrl}>
                            <MdLogout size={32} color="white" />
                        </NextLink> : null}
                    </Stack>
                </Toolbar>
            </Container>
        </AppBar>
    );
}