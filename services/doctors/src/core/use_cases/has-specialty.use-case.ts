import { DoctorHasSpecialtyDto } from "@application/dto/has-specialty.dto";
import { NotFoundException } from "@application/error/errors";
import { IDoctorRepository } from "@core/interfaces/repositories/doctor.repository.interface";

export class DoctorHasSpecialtyUseCase {
  constructor(readonly doctorRepository: IDoctorRepository) {}

  async execute(input: DoctorHasSpecialtyDto) {
    input.validate();

    const doctor = await this.doctorRepository.findById(input.doctorId);

    if (!doctor) {
      throw new NotFoundException("Doctor not found");
    }

    return doctor.hasSpecialty(input.specialty);
  }
}
