export class Doctor {
  doctorId: string;
  specialties: string[];

  constructor(input: Doctor) {
    this.doctorId = input.doctorId;
    this.specialties = input.specialties;
  }

  hasSpecialty(specialty: string): boolean {
    return !!this.specialties?.includes(specialty);
  }
}
