import { BaseError } from "@core/errors/base.error";

export class HttpErrorHandler {
    handler(error: BaseError | Error) {
        if (error instanceof BaseError) {
            return {
                statusCode: error.name,
                message: error.message,
            }
        }

        return {
            statusCode: 500,
            message: error.message,
        }
    }
}