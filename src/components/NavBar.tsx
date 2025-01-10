import * as React from 'react';
import Link from 'next/link';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import ModeSwitch from './ModeSwitch';
import { MdLogout, MdMap } from 'react-icons/md';
import { Stack } from '@mui/material';
import DebugButton from './DebugButton';
import ModeButton from './ModeButton';

type NavBarProps = {
    debug: boolean,
    exitUrl: string,
    title: string,
}

export default function NavBar({ debug, exitUrl, title }: NavBarProps) {
    return (
        <AppBar position="static" id="back-to-top-anchor" >
            <Toolbar sx={{ justifyContent: 'space-between' }}>
                <Stack direction="row" spacing={2}>
                    <MdMap size={32} />
                    <Typography variant="h6" component="div">
                        {title}
                    </Typography>
                </Stack>
                <Stack direction="row" spacing={2}>
                    <ModeButton />
                    { debug ? <DebugButton /> : null }
                    <Link href={exitUrl}>
                        <MdLogout size={32} color="white" />
                    </Link>
                </Stack>
            </Toolbar>
        </AppBar>
    );
}