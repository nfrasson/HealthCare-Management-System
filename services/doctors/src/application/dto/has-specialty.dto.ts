import { InvalidInputException } from "@application/error/errors";
import { DoctorSpecialty } from "@core/entities/doctor.entity";

export class DoctorHasSpecialtyDto {
  doctorId: string;
  specialty: DoctorSpecialty;

  constructor(input: any) {
    this.doctorId = input.doctorId;
    this.specialty = input.specialty;
  }

  validate() {
    if (!this?.doctorId) {
      throw new InvalidInputException("doctorId is required");
    }

    if (!this?.specialty) {
      throw new InvalidInputException("specialty is required");
    }

    if (!Object.values(DoctorSpecialty).includes(this.specialty)) {
      throw new InvalidInputException(
        `Invalid specialty, must be one of: ${Object.values(
          DoctorSpecialty
        ).join(", ")}`
      );
    }
  }
}
