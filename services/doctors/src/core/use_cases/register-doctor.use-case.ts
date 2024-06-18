import { RegisterDoctorDto } from "@application/dto";
import { Doctor } from "@core/entities/doctor.entity";
import { ILogger } from "@core/interfaces/services/logger.interface";
import { IQueueService } from "@core/interfaces/services/queue.interface";
import { IDoctorRepository } from "@core/interfaces/repositories/doctor.repository.interface";

export class RegisterDoctorUseCase {
  constructor(
    private logger: ILogger,
    private queueService: IQueueService,
    private doctorRepository: IDoctorRepository
  ) {}

  async execute(input: RegisterDoctorDto): Promise<void> {
    input.validate();

    const doctor = Doctor.create(input);
    await this.doctorRepository.save(doctor);

    this.queueService.produce("doctor_registered", doctor);

    this.logger.info("Doctor registered");
  }
}
