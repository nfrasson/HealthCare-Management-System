import { NotFoundException } from "./not-found.error";
import { BaseError } from "@application/errors/base.error";

export class HttpErrorHandler {
  private statusCodeMapper: Map<string, number> = new Map([
    [NotFoundException.name, 404],
  ]);

  handle(error: BaseError | Error): { statusCode: number; message: string } {
    return {
      message: error.message,
      statusCode: this.statusCodeMapper.get(error.name) || 500,
    };
  }
}
