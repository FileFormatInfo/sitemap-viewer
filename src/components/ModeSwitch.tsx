'use client';
import * as React from 'react';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { useColorScheme } from '@mui/material/styles';
import { MdNightlight, MdOutlinePhonelink, MdSunny } from "react-icons/md";

export default function ModeSwitch() {
  const { mode, setMode } = useColorScheme();
  if (!mode) {
    return null;
  }
  return (
      <FormControl sx={{borderImageWidth: 0}}>
        <Select
          id="mode-select"
          value={mode}
          onChange={(event) => setMode(event.target.value as typeof mode)}
        >
          <MenuItem value="system"><MdOutlinePhonelink /></MenuItem>
          <MenuItem value="light"><MdSunny /></MenuItem>
          <MenuItem value="dark"><MdNightlight /></MenuItem>
        </Select>
      </FormControl>
  );
}
