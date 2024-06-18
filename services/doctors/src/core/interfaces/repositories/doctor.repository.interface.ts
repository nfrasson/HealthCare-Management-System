import { Doctor } from "@core/entities/doctor.entity";

export interface IDoctorRepository {
  save(doctor: Doctor): Promise<void>;
  existsById(doctorId: string): Promise<boolean>;
  findByEmail(email: string): Promise<Doctor | null>;
}
