export type Locale = (typeof locales)[number];

export const locales = ["en", "fr", "de", "es", "it", "pl", "pt"] as const;
export const defaultLocale: Locale = "en";
