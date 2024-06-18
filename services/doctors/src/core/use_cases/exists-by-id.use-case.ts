import { DoctorExistsByIdDto } from "@application/dto";
import { IDoctorRepository } from "@core/interfaces/repositories/doctor.repository.interface";

export class DoctorExistsByIdUseCase {
  constructor(private doctorRepository: IDoctorRepository) {}

  async execute(input: DoctorExistsByIdDto): Promise<void> {
    input.validate();

    const exists = await this.doctorRepository.existsById(input.doctorId);

    if (!exists) return NotFoundException("Doctor not found");
  }
}
