import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import ModeSwitch from './ModeSwitch';
import { MdMap } from 'react-icons/md';
import { Stack } from '@mui/material';

type NavBarProps = {
    title?: string,
}

export default function NavBar({title}:NavBarProps) {
  return (
      <AppBar position="static" id="back-to-top-anchor" >
        <Toolbar sx={{justifyContent: 'space-between'}}>
            <Stack direction="row" spacing={2}>
            <MdMap size={32} />
          <Typography variant="h6" component="div">
            {title}
          </Typography>
          </Stack>
          <ModeSwitch />
          </Toolbar>
      </AppBar>
  );
}