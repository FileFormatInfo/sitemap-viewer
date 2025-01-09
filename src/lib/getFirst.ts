function getFirst(param:string|string[]|null|undefined, defaultValue:string): string {

    if (!param) {
        return defaultValue;
    }

    if (Array.isArray(param)) {
        if (param.length === 0) {
            return defaultValue;
        }
        return param[0] || defaultValue;
    }

    return param;
}

export {
    getFirst,
}