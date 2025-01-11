'use client';
import * as React from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { MdBugReport } from 'react-icons/md';
import DialogContent from '@mui/material/DialogContent';

export interface DebugDialogProps {
    open: boolean;
    messages: string[];
    onClose: () => void;
}

function DebugDialog(props: DebugDialogProps) {
    const { messages, open, onClose } = props;

    return (
        <Dialog maxWidth="lg" open={open} onClose={onClose} scroll="paper">
            <DialogTitle onClick={onClose}>
                Log Messages ({messages.length} lines)
            </DialogTitle>
            <DialogContent dividers>
            <pre>{messages.join('\n')}</pre>
            </DialogContent>
        </Dialog>
    );
}

export interface DebugButtonProps {
    messages: string[];
}

export default function DebugButton({ messages }: DebugButtonProps) {
    const [open, setOpen] = React.useState(false);
/*
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (value: string) => {
        setOpen(false);
    };
*/
    return (
        <>
            <MdBugReport onClick={() => setOpen(true)} size={32} />
            <DebugDialog messages={messages} open={open} onClose={() => setOpen(false)} />
        </>
    );
}

