export class ExecutionResult {
    success!: boolean;
    errorMessage!: string;

    constructor(success: boolean = true, errorMessage: string = '') {
        this.success = success;
        this.errorMessage = errorMessage;
    }
}