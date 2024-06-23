import { Consultation } from "@core/entities/consultation.entity";

export interface IConsultationRepository {
  save(appointment: Consultation): Promise<void>;
  alreadyScheduled(patientId: string, doctorId: string, specialty: string): Promise<boolean>;
}
