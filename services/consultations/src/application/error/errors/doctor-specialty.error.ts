import { BaseError } from "./base.error";

export class DoctorSpecialtyException extends BaseError {
  constructor(message: string) {
    super(DoctorSpecialtyException.name, message);
  }
}
