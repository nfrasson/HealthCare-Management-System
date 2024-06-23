import { Consultation } from "@core/entities/consultation.entity";
import { ILogger } from "@core/interfaces/services/logger.interface";
import { IQueueService } from "@core/interfaces/services/queue.interface";
import { IDoctorGateway } from "@core/interfaces/gateways/doctor.gateway";
import { IPatientGateway } from "@core/interfaces/gateways/patient.gateway";
import { ScheduleConsultationDto } from "@application/dto/schedule-consultation.dto";
import {
  NotFoundException,
  DoctorSpecialtyException,
  ConsultationAlreadyScheduledException,
} from "@application/error/errors";
import { IConsultationRepository } from "@core/interfaces/repositories/consultation.repository.interface";

export class ScheduleConsultationUseCase {
  constructor(
    private logger: ILogger,
    private queueService: IQueueService,
    private doctorGateway: IDoctorGateway,
    private patientGateway: IPatientGateway,
    private consultationRepository: IConsultationRepository
  ) {}

  async execute(input: ScheduleConsultationDto): Promise<{ id: string }> {
    input.validate();

    const [
      doctorExists,
      patientExists,
      doctorHasSpecialty,
      consultationAlreadyScheduled,
    ] = await Promise.all([
      this.doctorGateway.existsById(input.doctorId),
      this.patientGateway.existsById(input.patientId),
      this.doctorGateway.validateSpecialty(input.doctorId, input.specialty),
      this.consultationRepository.alreadyScheduled(
        input.patientId,
        input.doctorId,
        input.specialty
      ),
    ]);

    if (!doctorExists) {
      throw new NotFoundException("Doctor not found");
    }

    if (!patientExists) {
      throw new NotFoundException("Patient not found");
    }

    if (!doctorHasSpecialty) {
      throw new DoctorSpecialtyException(
        "Doctor does not have the requested specialty"
      );
    }

    if (consultationAlreadyScheduled) {
      throw new ConsultationAlreadyScheduledException(
        "Consultation already scheduled with this doctor"
      );
    }

    const consultation = Consultation.create(input);
    await this.consultationRepository.save(consultation);

    this.queueService.produce("consultation_registered", consultation);

    this.logger.info("Consultation registered");

    return { id: consultation.id };
  }
}
