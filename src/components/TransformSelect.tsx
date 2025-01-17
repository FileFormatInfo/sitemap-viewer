import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useTranslations } from 'next-intl';
import { UseFormRegisterReturn } from 'react-hook-form';


type Transform = (typeof transforms)[number]

const transforms = ['original', 'initialcap', 'titlecase'] as const;

//LATER: maybe also \p{Symbol}?

function initialCap(s: string): string {
    s = s.replace(/[^\p{Letter}\p{Number}]+/gu, ' ');
    return s.length == 0 ? s : s.charAt(0).toUpperCase() + s.slice(1);
}

function titleCaseWord(s: string): string {
    return s.length == 0 ? s : s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
}

function titleCase(s: string): string {
    return s.replace(/[^\p{Letter}\p{Number}]+/gu, ' ').split(/\s+/).map(titleCaseWord).join(' ');
}

const DEFAULT_TRANSFORM:Transform = 'initialcap';

const transformMap = new Map<string, (s: string) => string>([
    ['initialcap', initialCap],
    ['titlecase', titleCase],
]);

function getTransform(value: string): ((s: string) => string) | null {
    return transformMap.get(value) || null;
}

type TransformSelectProps = {
    register: UseFormRegisterReturn<string>
}

function TransformSelect({ register }: TransformSelectProps) {
    const t = useTranslations('Transform');

    const sortedOptions = [...transforms].sort((a:Transform, b:Transform) => t(a).localeCompare(t(b)));

    return (
        <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel shrink htmlFor="transform">
                {t('label')}
            </InputLabel>
            <Select
                native
                defaultValue={ DEFAULT_TRANSFORM}
                inputProps={{
                    name: 'transform',
                    id: 'transform',
                }}
                label={t('label')}
                {...register}
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

export {
    DEFAULT_TRANSFORM,
    getTransform,
    TransformSelect,
}