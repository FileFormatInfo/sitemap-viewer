
type ErrorLogEntry = {
    date: Date,
    catcher: string,
    message: string,
    err?: Error,
    data?: any,
}

const errorList: ErrorLogEntry[] = [];

function addError(ele: ErrorLogEntry) {
    ele.date = new Date();
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