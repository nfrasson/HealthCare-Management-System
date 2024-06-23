import { Patient } from "@core/entities/patient.entity";

export interface IPatientRepository {
    save(patient: Patient): Promise<void>;
    existsById(id: string): Promise<boolean>;
    findByEmail(email: string): Promise<Patient | null>;
}