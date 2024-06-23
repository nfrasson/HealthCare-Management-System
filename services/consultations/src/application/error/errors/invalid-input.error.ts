import { BaseError } from "./base.error";

export class InvalidInputException extends BaseError {
  constructor(message: string) {
    super(InvalidInputException.name, message);
  }
}
