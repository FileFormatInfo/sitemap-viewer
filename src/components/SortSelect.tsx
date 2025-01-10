import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import Select from '@mui/material/Select';

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
                    <option value="original">Original</option>
                    <option value="url">URL</option>
                    <option value="name">Name</option>
                </Select>
            </FormControl>
    );
}