import { Patient } from "@core/entities/patient.entity";

export interface IPatientRepository {
    save(patient: Patient): Promise<void>;
    findByEmail(email: string): Promise<Patient | null>;
}