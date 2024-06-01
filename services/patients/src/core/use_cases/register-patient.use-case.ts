import { Patient } from "@core/entities/patient.entity";
import { ILogger } from "@core/interfaces/services/logger.interface";
import { RegisterPatientDto } from "@application/dto/register-patient.dto";
import { IPatientRepository } from "@core/interfaces/repositories/patient.repository.interface";
import { IQueueService } from "@core/interfaces/services/queue.interface";

export class RegisterPatientUseCase {
  constructor(
    private logger: ILogger,
    private queueService: IQueueService,
    private patientRepository: IPatientRepository,
  ) {}

  async execute(input: RegisterPatientDto): Promise<void> {
    input.validate();

    const patient = Patient.create(input);
    await this.patientRepository.save(patient);

    this.queueService.produce("patient_registered", patient);

    this.logger.info("Patient registered");
  }
}
