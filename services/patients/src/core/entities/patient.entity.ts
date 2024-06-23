import { randomUUID } from "crypto";

export type PatientType = Patient;

export class Patient {
  id: string;
  name: string;
  email: string;
  password: string;
  registeredAt: Date;
  dateOfBirth: Date;

  constructor(input: PatientType) {
    this.id = input.id;
    this.name = input.name;
    this.email = input.email;
    this.password = input.password;
    this.registeredAt = input.registeredAt;
    this.dateOfBirth = input.dateOfBirth;
  }

  static create(input: Omit<PatientType, "id" | "registeredAt">) {
    return new Patient({ ...input, id: randomUUID(), registeredAt: new Date() });
  }
}
