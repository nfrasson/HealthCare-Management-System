import { Doctor } from "@core/entities/doctor.entity";

export interface IDoctorRepository {
  save(doctor: Doctor): Promise<void>;
  existsById(doctorId: string): Promise<boolean>;
  findById(doctorId: string): Promise<Doctor | null>;
}
