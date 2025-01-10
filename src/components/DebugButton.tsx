'use client';
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
import PersonIcon from '@mui/icons-material/Person';
import { blue } from '@mui/material/colors';
import { MdBugReport } from 'react-icons/md';

const emails = ['username@gmail.com', 'user02@gmail.com'];

export interface DebugDialogProps {
    open: boolean;
    messages?: string[];
    onClose: () => void;
}

function DebugDialog(props: DebugDialogProps) {
    const { open, onClose } = props;

    return (
        <Dialog open={open}>
            <DialogTitle onClick={onClose}>
                Set backup account
            </DialogTitle>
            <List sx={{ pt: 0 }}>
                {emails.map((email) => (
                    <ListItem disablePadding key={email}>
                        <ListItemButton >
                            <ListItemAvatar>
                                <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                                    <PersonIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={email} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Dialog>
    );
}


export default function DebugButton() {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (value: string) => {
        setOpen(false);
    };

    return (
        <>
            <MdBugReport onClick={() => setOpen(true)} size={32} />
            <DebugDialog open={open} onClose={() => setOpen(false)} />
        </>
    );
}