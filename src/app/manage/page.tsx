import NextLink from 'next/link';
import { useTranslations } from "next-intl"
import Stack from "@mui/material/Stack";


export default function ManagePage() {
    const t = useTranslations('ManagePage');
    return (
        <Stack spacing={2}>
            <NextLink href="/manage/usage.html">{t("usage_link")}</NextLink>
            <NextLink href="/manage/errors.html">{t("errors_link")}</NextLink>
            <NextLink href="/">{t("exit_link")}</NextLink>
        </Stack>
    )
}