'use client';
import * as React from 'react';
import { MdDarkMode, MdBrightness6, MdLightMode, MdOutlinePhonelink } from "react-icons/md";
import { IconType } from 'react-icons';
import ListItemText from '@mui/material/ListItemText';
import { useColorScheme } from '@mui/material/styles';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';

type Mode = 'light' | 'dark' | 'system';    //LATER: import from ???

type ModeItem = {
    value: Mode;
    icon: IconType;
    label: string;
}

const modes: ModeItem[] = [
    { value: "system", icon: MdOutlinePhonelink, label: "System" },
    { value: "light", icon: MdLightMode, label: "Light" },
    { value: "dark", icon: MdDarkMode, label: "Dark" },
];

export default function ModeButton() {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const { mode, setMode } = useColorScheme();

    React.useEffect(() => {
        const savedMode = localStorage.getItem('colorScheme') as Mode;
        if (savedMode) {
            setMode(savedMode);
        }
    }, [setMode]);

    if (!mode) {
        return null;
    }

    const handleClose = (value: string | null = null) => {
        setAnchorEl(null);
        if (value != null) {
            setMode(value as Mode);
            localStorage.setItem('colorScheme', value);
        }
    };

    return (
        <>
            <div
                id="mode-button"
                aria-controls={open ? 'mode-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
            >
                <MdBrightness6 color="white" size={32} />
            </div>
            <Menu
                id="mode-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={() => handleClose(null)}
                MenuListProps={{
                    'aria-labelledby': 'mode-button',
                }}
            >{modes.map((option) => (
                <MenuItem key={option.value} onClick={() => handleClose(option.value)}>
                    <ListItemIcon>
                        <option.icon />
                    </ListItemIcon>
                    <ListItemText>
                        {option.label} {option.value == mode ? "(current)" : ""}
                    </ListItemText>
                </MenuItem>
            ))
                }
            </Menu>
        </>
    );
}

/*
 */