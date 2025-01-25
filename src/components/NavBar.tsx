import NextLink from 'next/link';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { MdLogout, MdMap } from 'react-icons/md';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import DebugButton from './DebugButton';
import ModeButton from './ModeButton';
import LocaleButton from './LocaleButton';

type NavBarProps = {
    debug: boolean,
    exit: boolean,
    language: boolean,
    messages: string[],
    mode: boolean,
    returnUrl: string,
    title: string,
}

export default function NavBar({ debug, exit, language, messages, mode, returnUrl, title }: NavBarProps) {
    return (
        <AppBar position="static" id="back-to-top-anchor" >
            <Container maxWidth="md" disableGutters={true}>
                <Toolbar disableGutters={true} sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
                    <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
                        <NextLink href={returnUrl} style={{ display: 'flex', alignItems: 'center' }}>
                            <MdMap size={32} color="white" />
                        </NextLink>
                        <Typography variant="h6" component="div" >
                            {title}
                        </Typography>
                    </Stack>
                    <Stack alignItems="center" direction="row" spacing={3}>
                        {mode ? <ModeButton /> : null}
                        {debug ? <DebugButton messages={messages} /> : null}
                        {language ? <LocaleButton /> : null}
                        {exit ? <NextLink href={returnUrl} style={{ display: 'flex', alignItems: 'center' }}>
                            <MdLogout size={32} color="white" />
                        </NextLink> : null}
                    </Stack>
                </Toolbar>
            </Container>
        </AppBar>
    );
}