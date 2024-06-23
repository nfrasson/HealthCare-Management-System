import { InvalidInputException } from "@application/error/errors";

export class ScheduleAppointmentDto {
  date: Date;
  doctorId: string;
  patientId: string;
  specialty: string;

  constructor(input: any) {
    this.doctorId = input.doctorId;
    this.patientId = input.patientId;
    this.specialty = input.specialty;
    this.date = input.date && new Date(input.date);
  }

  validate() {
    if (!this?.date) {
      throw new InvalidInputException("date is required");
    }
    if (!this?.doctorId) {
      throw new InvalidInputException("doctorId of birth is required");
    }
    if (!this?.patientId) {
      throw new InvalidInputException("patientId is required");
    }
    if (!this?.specialty) {
      throw new InvalidInputException("specialty is required");
    }
  }
}
