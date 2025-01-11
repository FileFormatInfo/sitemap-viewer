import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const sortOptions = [
    { value: 'original', label: 'Original' },
    { value: 'url', label: 'URL' },
    { value: 'name', label: 'Name' },
    { value: 'dirfirst', label: 'Name, but directories first' },
];

export default function SortSelect() {
    return (
            <FormControl fullWidth sx={{ mt: 2 }}>
                <InputLabel shrink htmlFor="sort">
                    Sort
                </InputLabel>
                <Select
                    native
                    defaultValue="original"
                    inputProps={{
                        name: 'sort',
                        id: 'sort',
                    }}
                    label="Sort"
                >
                    {sortOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </Select>
            </FormControl>
    );
}