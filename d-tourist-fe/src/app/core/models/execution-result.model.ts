export class ExecutionResult {
    success!: boolean;
    message!: string;

    constructor(success: boolean = true, errorMessage: string = '') {
        this.success = success;
        this.message = errorMessage;
    }
}