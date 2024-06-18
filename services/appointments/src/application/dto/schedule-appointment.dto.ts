export class ScheduleAppointmentDto {
  date: Date;
  doctorId: string;
  patientId: string;
  specialty: string;

  constructor(input: any) {
    this.date = new Date(input.date);
    this.doctorId = input.doctorId;
    this.patientId = input.patientId;
    this.specialty = input.specialty;
  }

  validate() {
    if (!this?.date) {
      throw new Error("date is required");
    }
    if (!this?.doctorId) {
      throw new Error("doctorId of birth is required");
    }
    if (!this?.patientId) {
      throw new Error("patientId is required");
    }
    if (!this?.specialty) {
      throw new Error("specialty is required");
    }
  }
}
