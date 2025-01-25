import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useTranslations } from 'next-intl';
import { UseFormRegisterReturn } from 'react-hook-form';

type Sorts = (typeof sorts)[number];

const sorts = [
    'original',
    'url',
    'name',
    'dirfirst'
] as const;

type SortSelectProps = {
    register: UseFormRegisterReturn<string>
}

const DEFAULT_SORT:Sorts = 'name';

function SortSelect( { register }: SortSelectProps ) {
    const t = useTranslations('Sort');

    const sortedOptions = [...sorts].sort((a:Sorts, b:Sorts) => t(a).localeCompare(t(b)));

    return (
        <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel shrink htmlFor="sort">
                {t('label')}
            </InputLabel>
            <Select
                native
                inputProps={{
                    name: 'sort',
                    id: 'sort',
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
    DEFAULT_SORT,
    SortSelect,
}