import { InvalidInputException } from "@application/error/errors";

export class DoctorExistsByIdDto {
  doctorId: string;

  constructor(input: any) {
    this.doctorId = input.doctorId;
  }

  validate() {
    if (!this?.doctorId) {
      throw new InvalidInputException("doctorId is required");
    }
  }
}
