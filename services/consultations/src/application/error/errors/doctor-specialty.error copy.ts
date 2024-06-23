import { BaseError } from "./base.error";

export class ConsultationAlreadyScheduledException extends BaseError {
  constructor(message: string) {
    super(ConsultationAlreadyScheduledException.name, message);
  }
}
