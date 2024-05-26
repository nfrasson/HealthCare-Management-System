import { randomUUID } from "crypto";

export type PatientType = Patient;

export class Patient {
  id: string;
  name: string;
  email: string;
  password: string;
  registedAt: Date;
  dateOfBirth: Date;

  constructor(input: PatientType) {
    this.id = input.id;
    this.name = input.name;
    this.email = input.email;
    this.password = input.password;
    this.registedAt = input.registedAt;
    this.dateOfBirth = input.dateOfBirth;
  }

  static create(input: Omit<PatientType, "id" | "registedAt">) {
    return new Patient({ ...input, id: randomUUID(), registedAt: new Date() });
  }
}
