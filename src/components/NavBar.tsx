import * as React from 'react';
import Link from 'next/link';
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
    exitUrl: string,
    messages: string[],
    title: string,
}

export default function NavBar({ debug, exitUrl, messages, title }: NavBarProps) {
    return (
        <AppBar position="static" id="back-to-top-anchor" >
            <Container maxWidth="lg" disableGutters={true}>
                <Toolbar sx={{ justifyContent: 'space-between' }}>
                    <Stack direction="row" spacing={2}>
                        <MdMap size={36} />
                        <Typography variant="h6" component="div">
                            {title}
                        </Typography>
                    </Stack>
                    <Stack direction="row" spacing={2}>
                        <ModeButton />
                        {debug ? <DebugButton messages={messages} /> : null}
                        <Link href={exitUrl}>
                            <MdLogout size={32} color="white" />
                        </Link>
                    </Stack>
                </Toolbar>
            </Container>
        </AppBar>
    );
}