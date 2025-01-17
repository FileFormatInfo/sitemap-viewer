'use client';
import * as React from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useForm, SubmitHandler } from 'react-hook-form';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';

import { constants } from '@/lib/constants';
import { DEFAULT_SORT, SortSelect } from '@/components/SortSelect';
import { DEFAULT_TRANSFORM, TransformSelect } from '@/components/TransformSelect';
import { ConfigInputs } from '@/lib/ConfigInputs';

export default function ConfigForm() {
    const t = useTranslations('HomePage');
    const router = useRouter();
    const { register, handleSubmit, formState: { errors } } = useForm<ConfigInputs>({
        defaultValues: {
            url: constants.DEFAULT_SITEMAP_URL,
            exit: '',
            sort: DEFAULT_SORT,
            transform: DEFAULT_TRANSFORM,
            showmode: true,
            showdebug: false,
            showlanguage: true,
            showexit: true,
        }
    });

    const onSubmit: SubmitHandler<ConfigInputs> = (data) => {
        /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
        const queryString = new URLSearchParams(data as any).toString();
        router.push(`/view.html?${queryString}`);
    };
    console.log(errors);

    return (
        <form action="/view.html" onSubmit={handleSubmit(onSubmit)} method="get" style={{ width: '100%' }}>
            <TextField
                error={!!errors.url}
                fullWidth
                helperText={errors.url ? errors.url.message : ''}
                id="text"
                label={t("url_label")}
                sx={{ mt: 2 }}
                defaultValue={constants.DEFAULT_SITEMAP_URL}
                {...register("url", { required: t("url_required") })}
            />
            <TextField
                fullWidth
                helperText={t("return_help")}
                id="return"
                label={t("return_label")}
                sx={{ mt: 2 }}
                defaultValue=""
                {...register("exit")}
            />
            <SortSelect register={register("sort")} />
            <TransformSelect register={register("transform")} />
            <FormGroup sx={{ mt: 2 }}>
                <FormControlLabel control={<Checkbox value="1" defaultChecked {...register("showmode")} />} label={t("show_mode_label")} />
            </FormGroup>
            <FormGroup sx={{ mt: 1 }}>
                <FormControlLabel control={<Checkbox value="1" {...register("showdebug")} />} label={t("show_log_label")} />
            </FormGroup>
            <FormGroup sx={{ mt: 1 }}>
                <FormControlLabel control={<Checkbox value="1" defaultChecked {...register("showlanguage")} />} label={t("show_language_label")} />
            </FormGroup>
            <FormGroup sx={{ mt: 1 }}>
                <FormControlLabel control={<Checkbox value="1" defaultChecked {...register("showexit")} />} label={t("show_exit_label")} />
            </FormGroup>
            <Stack direction="row" spacing={2} justifyContent="flex-start" sx={{ mt: 2 }}>
                <Button color="success" variant="contained" type="submit">
                    {t("view_button")}
                </Button>
                <Button color="success" variant="outlined" component={NextLink} href="https://www.sitemap.style/">
                    {t("cancel_button")}
                </Button>
                <Stack direction="row" flex="1" justifyContent="flex-end" spacing={2} sx={{ backgroundColor: 'transparent' }}>
                    <Button component={NextLink} variant="contained" href={`/view.html?url=${encodeURIComponent(constants.DEMO_URL)}&showmode=1&showlanguage=1&showexit=1&sort=name&return=/&showexit=1`}>
                        {t("demo_button")}
                    </Button>
                </Stack>
            </Stack>
        </form>
    );
}
