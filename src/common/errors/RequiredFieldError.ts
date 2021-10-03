import { GeneralError } from "./GeneralError";

export class RequiredFieldError extends GeneralError {

    constructor(fieldName: string) {
        super(`${fieldName} is required.`, null, 'REQUIRED_FIELD');
    }
}