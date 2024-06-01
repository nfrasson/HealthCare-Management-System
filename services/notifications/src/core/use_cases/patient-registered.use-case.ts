import { ILogger } from "@core/interfaces/services/logger.interface";

export class PatientRegisteredUseCase {
  constructor(private logger: ILogger) {}

  async execute(patient: any): Promise<void> {
    this.logger.info("Patient registered", patient);
  }
}
