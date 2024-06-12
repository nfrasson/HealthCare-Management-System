import { Doctor } from "@core/entities/doctor.entity";

export interface IDoctorRepository {
  save(doctor: Doctor): Promise<void>;
  findByEmail(email: string): Promise<Doctor | null>;
}
