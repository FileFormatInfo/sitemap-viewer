function dateFormat(date: Date): string {
    return date.toISOString().replace("T", " ").slice(0, 16);
}

export { dateFormat };