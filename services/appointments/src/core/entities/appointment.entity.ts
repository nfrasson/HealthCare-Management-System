import { uuidV7 } from "@core/utils/uuid.generator";

export type AppointmentType = Appointment;

export class Appointment {
  id: string;
  date: Date;
  doctorId: string;
  patientId: string;

  constructor(input: AppointmentType) {
    this.id = input.id;
    this.date = input.date;
    this.doctorId = input.doctorId;
    this.patientId = input.patientId;
  }

  static create(input: Omit<AppointmentType, "id">) {
    return new Appointment({ ...input, id: uuidV7() });
  }
}
