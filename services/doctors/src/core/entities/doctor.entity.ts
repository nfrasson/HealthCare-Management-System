import { uuidV7 } from "@core/utils/uuid.generator";

export type DoctorType = Omit<Doctor, "hasSpecialty">;

export enum DoctorSpecialty {
  GENERAL = "GENERAL",
  PEDIATRIC = "PEDIATRIC",
  NEUROLOGIST = "NEUROLOGIST",
  CARDIOLOGIST = "CARDIOLOGIST",
}

export class Doctor {
  id: string;
  name: string;
  email: string;
  password: string;
  registeredAt: Date;
  specialties: DoctorSpecialty[];

  constructor(input: DoctorType) {
    this.id = input.id;
    this.name = input.name;
    this.email = input.email;
    this.password = input.password;
    this.registeredAt = input.registeredAt;
    this.specialties = input.specialties;
  }

  static create(input: Omit<DoctorType, "id" | "registeredAt">) {
    return new Doctor({ ...input, id: uuidV7(), registeredAt: new Date() });
  }

  hasSpecialty(specialty: DoctorSpecialty) {
    return !!this.specialties?.includes(specialty);
  }
}
