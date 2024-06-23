import { Consultation } from "@core/entities/consultation.entity";

export interface IConsultationRepository {
  save(appointment: Consultation): Promise<void>;
  findByPatientId(patientId: string): Promise<Consultation | null>;
}
