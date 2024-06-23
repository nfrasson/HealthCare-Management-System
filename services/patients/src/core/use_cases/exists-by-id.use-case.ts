import { PatientExistsByIdDto } from "@application/dto";
import { NotFoundException } from "@application/error/errors";
import { IPatientRepository } from "@core/interfaces/repositories/patient.repository.interface";

export class PatientExistsByIdUseCase {
  constructor(private patientRepository: IPatientRepository) {}

  async execute(input: PatientExistsByIdDto): Promise<void> {
    input.validate();

    const exists = await this.patientRepository.existsById(input.patientId);

    if (!exists) throw new NotFoundException("Patient not found");
  }
}
