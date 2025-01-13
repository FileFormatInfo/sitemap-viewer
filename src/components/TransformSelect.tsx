import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

type TransformOption = {
    value: string;
    label: string;
    transform: ((s: string) => string) | null;
}

function initialCap(s: string): string {
    s = s.replace(/[^\w]+/g, ' ');
    return s.length == 0 ? s : s.charAt(0).toUpperCase() + s.slice(1);
}

function titleCaseWord(s: string): string {
    return s.length == 0 ? s : s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
}

function titleCase(s: string): string {
    return s.replace(/[^\w]+/g, ' ').split(/\s+/).map(titleCaseWord).join(' ');
}

const transformOptions:TransformOption[] = [
    { value: 'original', label: 'No change', transform: null },
    { value: 'initialcap', label: 'First letter capitalized, punctation to spaces', transform: initialCap },
    { value: 'titlecase', label: 'Title cased, punctuation to spaces', transform: titleCase },
];

const DEFAULT_TRANSFORM = transformOptions[2].value;

const transformMap = new Map<string, (s: string) => string>(transformOptions.map((option) => [option.value, option.transform || ((s: string) => s)]));

function getTransform(value: string): ((s: string) => string) | null {
    return transformMap.get(value) || null;
}

export default function TransformSelect() {
    return (
        <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel shrink htmlFor="transform">
                Page Name Transform
            </InputLabel>
            <Select
                native
                defaultValue={ DEFAULT_TRANSFORM}
                inputProps={{
                    name: 'transform',
                    id: 'transform',
                }}
                label="Page Name Transform"
            >
                {transformOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </Select>
        </FormControl>
    );
}

export {
    getTransform,
    DEFAULT_TRANSFORM,
}