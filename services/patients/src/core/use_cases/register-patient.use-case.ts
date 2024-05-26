import { Patient } from "@core/entities/patient.entity";
import { RegisterPatientDto } from "@application/dto/register-patient.dto";
import { IPatientRepository } from "@core/interfaces/repositories/patient.repository.interface";
import { ILogger } from "@core/interfaces/logger.interface";

export class RegisterPatientUseCase {
  constructor(
    private logger: ILogger,
    private patientRepository: IPatientRepository
  ) {}

  async execute(input: RegisterPatientDto): Promise<void> {
    input.validate();

    const patient = Patient.create(input);
    await this.patientRepository.save(patient);

    this.logger.info("Patient registered");
  }
}
