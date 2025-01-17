
type ErrorLogEntry = {
    date?: Date;
    catcher: string;
    message: string;
    err?: Error;
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    data?: any;
};

const errorList: ErrorLogEntry[] = [];

function addError(ele: ErrorLogEntry) {
    ele.date = ele.date || new Date();
    errorList.push(ele);
}

function getErrors() {
    return errorList;
}

export {
    addError,
    type ErrorLogEntry,
    getErrors,
}