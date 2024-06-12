export class ScheduleAppointmentDto {
  date: Date;
  doctorId: string;
  patientId: string;

  constructor(input: any) {
    this.date = new Date(input.date);
    this.doctorId = input.doctorId;
    this.patientId = input.patientId;
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
  }
}
