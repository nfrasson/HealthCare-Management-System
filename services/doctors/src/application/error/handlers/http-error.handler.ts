import { BaseError, InvalidInputException, NotFoundException } from "../errors";

export class HttpErrorHandler {
  private statusCodeMapper: Map<string, number> = new Map([
    [NotFoundException.name, 404],
    [InvalidInputException.name, 400],
  ]);

  handle(error: BaseError | Error): { statusCode: number; message: string } {
    return {
      message: error.message,
      statusCode: this.statusCodeMapper.get(error.name) || 500,
    };
  }
}
