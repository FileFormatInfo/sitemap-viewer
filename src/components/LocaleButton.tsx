'use client';
import * as React from 'react';
import { MdTranslate, MdCheckCircle } from "react-icons/md";
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import { useLocale, useTranslations } from 'next-intl';

import { Locale, locales } from '@/i18n/config';
import { setCookie } from 'cookies-next/client';

export default function LocaleButton() {
    const t = useTranslations('LocaleSwitcher');
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const currentLocale = useLocale();

    if (!currentLocale) {
        return null;
    }

    const handleClose = (value: string | null = null) => {
        setAnchorEl(null);
        if (value != null) {
            //setMode(value as Mode);
            //localStorage.setItem('locale', value);
            setCookie('locale', value);
            console.log("LocaleButton: setLocale: ", value);
            window.location.reload();
        }
    };

    const localeComparator = (a: Locale, b: Locale) => t(a).localeCompare(t(b));
    const sortedLocales = [...locales].sort(localeComparator);

    return (
        <>
            <div
                id="locale-button"
                aria-controls={open ? 'locale-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
            >
                <MdTranslate color="primary" size={32} />
            </div>
            <Menu
                id="locale-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={() => handleClose(null)}
                MenuListProps={{
                    'aria-labelledby': 'locale-button',
                }}
            >{sortedLocales.map((option) => (
                <MenuItem key={option} onClick={() => handleClose(option)}>
                    <ListItemIcon>
                        { option == currentLocale ? <MdCheckCircle /> : null }
                    </ListItemIcon>
                    <ListItemText>
                        {t(option)}
                    </ListItemText>
                </MenuItem>
            ))
                }
            </Menu>
        </>
    );
}
