import { uuidV7 } from "@core/utils/uuid.generator";

export class Consultation {
  id: string;
  date: Date;
  doctorId: string;
  patientId: string;
  specialty: string;

  constructor(input: Consultation) {
    this.id = input.id;
    this.date = input.date;
    this.doctorId = input.doctorId;
    this.patientId = input.patientId;
    this.specialty = input.specialty;
  }

  static create(input: Omit<Consultation, "id">) {
    return new Consultation({ ...input, id: uuidV7() });
  }
}
