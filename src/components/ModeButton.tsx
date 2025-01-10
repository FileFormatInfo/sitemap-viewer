'use client'
import * as React from 'react';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { useColorScheme } from '@mui/material/styles';
import PersonIcon from '@mui/icons-material/Person';
import { blue } from '@mui/material/colors';
import { MdBugReport } from 'react-icons/md';
import { MdDarkMode, MdOutlinePhonelink, MdSunny } from "react-icons/md";
import { IconType } from 'react-icons';

type Mode = 'light' | 'dark' | 'system';    //LATER: import from ???


type ModeItem = {
    value: Mode;
    icon: IconType;
    label: string;
}

const modes: ModeItem[] = [
    { value: "system", icon: MdOutlinePhonelink, label: "System" },
    { value: "light", icon: MdSunny, label: "Light" },
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
        <Dialog open={open}>
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

export default function DebugButton() {
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

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (value: Mode | null) => {
        setOpen(false);
        if (value != null) {
            setMode(value);
            localStorage.setItem('colorScheme', value);
        }
    };

    const currentMode = modes.find((m) => m.value == mode);
    const CurrentIcon:IconType = currentMode ? currentMode.icon : modes[0].icon;


    return (
        <>
            <CurrentIcon onClick={() => setOpen(true)} size={32} />
            <ModeDialog open={open} current={mode} onClose={handleClose} />
        </>
    );
}
