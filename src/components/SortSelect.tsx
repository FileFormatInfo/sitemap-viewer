import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useTranslations } from 'next-intl';

type Sorts = (typeof sorts)[number];

const sorts = [
    'original',
    'url',
    'name',
    'dirfirst'
] as const;

export default function SortSelect() {
    const t = useTranslations('Sort');

    const sortedOptions = [...sorts].sort((a:Sorts, b:Sorts) => t(a).localeCompare(t(b)));

    return (
        <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel shrink htmlFor="sort">
                {t('label')}
            </InputLabel>
            <Select
                native
                defaultValue="original"
                inputProps={{
                    name: 'sort',
                    id: 'sort',
                }}
                label={t('label')}
            >
                {sortedOptions.map((option) => (
                    <option key={option} value={option}>
                        {t(option)}
                    </option>
                ))}
            </Select>
        </FormControl>
    );
}