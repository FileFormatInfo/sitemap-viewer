const errorList:string[] = [];

function addError(error:string) {
    errorList.push(error);
}

function getErrors() {
    return errorList;
}

export {
    addError,
    getErrors,
}