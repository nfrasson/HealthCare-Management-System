import { Appointment } from "@core/entities/appointment.entity";
import { ILogger } from "@core/interfaces/services/logger.interface";
import { IQueueService } from "@core/interfaces/services/queue.interface";
import { IDoctorGateway } from "@core/interfaces/gateways/doctor.gateway";
import { IPatientGateway } from "@core/interfaces/gateways/patient.gateway";
import { ScheduleAppointmentDto } from "@application/dto/schedule-appointment.dto";
import { IAppointmentRepository } from "@core/interfaces/repositories/appointment.repository.interface";

export class ScheduleAppointmentUseCase {
  constructor(
    private logger: ILogger,
    private queueService: IQueueService,
    private doctorGateway: IDoctorGateway,
    private patientGateway: IPatientGateway,
    private appointmentRepository: IAppointmentRepository
  ) {}

  async execute(input: ScheduleAppointmentDto): Promise<void> {
    input.validate();

    const [doctorExists, patientExists, doctorHasSpecialty] = await Promise.all(
      [
        this.doctorGateway.existsById(input.doctorId),
        this.patientGateway.existsById(input.patientId),
        this.doctorGateway.validateSpecialty(input.doctorId, input.specialty),
      ]
    );

    if (!doctorExists || !patientExists) {
      throw new Error("Doctor not found");
    }

    if (!doctorHasSpecialty) {
      throw new Error("Doctor does not have the requested specialty");
    }

    const appointment = Appointment.create(input);
    await this.appointmentRepository.save(appointment);

    this.queueService.produce("appointment_registered", appointment);

    this.logger.info("Appointment registered");
  }
}
