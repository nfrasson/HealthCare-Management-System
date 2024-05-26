import { Patient } from "@core/entities/patient";

export interface IPatientRepository {
    save(patient: Patient): Promise<void>;
    findByEmail(email: string): Promise<Patient | null>;
}