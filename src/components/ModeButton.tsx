'use client'
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { useColorScheme } from '@mui/material/styles';
import { blue } from '@mui/material/colors';
import { MdDarkMode, MdBrightness6, MdLightMode, MdOutlinePhonelink } from "react-icons/md";
import { IconType } from 'react-icons';

type Mode = 'light' | 'dark' | 'system';    //LATER: import from ???


type ModeItem = {
    value: Mode;
    icon: IconType;
    label: string;
}

// alternatives to system: MdSettingsBrightness, MdBrightness6, MdOutlinePhoneLink

const modes: ModeItem[] = [
    { value: "system", icon: MdOutlinePhonelink, label: "System" },
    { value: "light", icon: MdLightMode, label: "Light" },
    { value: "dark", icon: MdDarkMode, label: "Dark" },
];

export interface ModeDialogProps {
    open: boolean;
    current: string;
    onClose: (value: Mode | null) => void;
}

function ModeDialog(props: ModeDialogProps) {
    const { open, current, onClose } = props;

    return (
        <Dialog open={open} onClose={() => onClose(null)}>
            <DialogTitle onClick={() => onClose(null)}>
                Select Color Scheme
            </DialogTitle>
            <List sx={{ pt: 0 }}>
                {modes.map((mode) => (
                    <ListItem disablePadding key={mode.value}>
                        <ListItemButton onClick={() => onClose(mode.value)}>
                            <ListItemAvatar>
                                <Avatar sx={{ bgcolor: blue[50], color: blue[800]}}>
                                    <mode.icon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={`${mode.label} ${current == mode.value ? "(current)" : ""}`} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Dialog>
    );
}

export default function ModeButton() {
    const [open, setOpen] = React.useState(false);
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

    const handleClose = (value: Mode | null) => {
        setOpen(false);
        if (value != null) {
            setMode(value);
            localStorage.setItem('colorScheme', value);
        }
    };

    return (
        <>
            <MdBrightness6 onClick={() => setOpen(true)} size={32} />
            <ModeDialog open={open} current={mode} onClose={handleClose} />
        </>
    );
}
