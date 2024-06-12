import { Appointment } from "@core/entities/appointment.entity";
import { ILogger } from "@core/interfaces/services/logger.interface";
import { IQueueService } from "@core/interfaces/services/queue.interface";
import { ScheduleAppointmentDto } from "@application/dto/schedule-appointment.dto";
import { IAppointmentRepository } from "@core/interfaces/repositories/appointment.repository.interface";

export class ScheduleAppointmentUseCase {
  constructor(
    private logger: ILogger,
    private queueService: IQueueService,
    private appointmentRepository: IAppointmentRepository
  ) {}

  async execute(input: ScheduleAppointmentDto): Promise<void> {
    input.validate();

    const appointment = Appointment.create(input);
    await this.appointmentRepository.save(appointment);

    this.queueService.produce("appointment_registered", appointment);

    this.logger.info("Appointment registered");
  }
}
