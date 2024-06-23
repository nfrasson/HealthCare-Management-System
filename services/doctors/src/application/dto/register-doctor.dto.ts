import { InvalidInputException } from "@application/error/errors";
import { DoctorSpecialty } from "@core/entities/doctor.entity";

export class RegisterDoctorDto {
  name: string;
  email: string;
  password: string;
  specialties: DoctorSpecialty[];

  constructor(input: any) {
    this.name = input.name;
    this.email = input.email;
    this.password = input.password;
    this.specialties = input.specialties;
  }

  validate() {
    if (!this?.name) {
      throw new InvalidInputException("Name is required");
    }
    if (!this?.email) {
      throw new InvalidInputException("Email is required");
    }
    if (!this?.password) {
      throw new InvalidInputException("Password is required");
    }
    if (!this?.specialties) {
      throw new InvalidInputException("specialties is required");
    }
    if (!Array.isArray(this.specialties)) {
      throw new InvalidInputException("specialties must be an array");
    }
    if (this.specialties.length === 0) {
      throw new InvalidInputException("specialties must have at least one item");
    }
    if (
      this.specialties.some(
        (specialty) => !Object.values(DoctorSpecialty).includes(specialty)
      )
    ) {
      throw new InvalidInputException(
        `Invalid specialty, must be one of: ${Object.values(
          DoctorSpecialty
        ).join(", ")}`
      );
    }
  }
}
