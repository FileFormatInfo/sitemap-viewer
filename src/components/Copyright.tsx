import * as React from 'react';
import Typography from '@mui/material/Typography';
import MuiLink from '@mui/material/Link';

export default function Copyright() {
  return (
    <Typography
      variant="body2"
      align="center"
      sx={{
        color: 'text.secondary',
      }}
    >
      Copyright © 2025{' '}
      <MuiLink color="inherit" href="https://andrew.marcuse.info/">
        Andrew Marcuse
      </MuiLink>. All Rights Reserved.
    </Typography>
  );
}
