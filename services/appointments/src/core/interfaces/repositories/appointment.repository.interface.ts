import { Appointment } from "@core/entities/appointment.entity";

export interface IAppointmentRepository {
  save(appointment: Appointment): Promise<void>;
  findByPatientId(patientId: string): Promise<Appointment | null>;
}
