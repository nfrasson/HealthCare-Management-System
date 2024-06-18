import { randomUUID } from "crypto";

export type DoctorType = Doctor;

export class Doctor {
  id: string;
  name: string;
  email: string;
  password: string;
  registedAt: Date;
  specialties: string[];

  constructor(input: DoctorType) {
    this.id = input.id;
    this.name = input.name;
    this.email = input.email;
    this.password = input.password;
    this.registedAt = input.registedAt;
    this.specialties = input.specialties;
  }

  static create(input: Omit<DoctorType, "id" | "registedAt">) {
    return new Doctor({ ...input, id: randomUUID(), registedAt: new Date() });
  }
}
