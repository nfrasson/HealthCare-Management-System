import { Appointment, PrismaClient } from "@prisma/client";
import { Appointment as DomainAppointment } from "@core/entities/appointment.entity";
import { IAppointmentRepository } from "@core/interfaces/repositories/appointment.repository.interface";

export class AppointmentPrismaRepository implements IAppointmentRepository {
  constructor(private readonly database: PrismaClient) {}

  private static mapRepositoryAppointmentToDomainAppointment(
    repositoryAppointment: Appointment
  ): DomainAppointment {
    if (!repositoryAppointment) {
      return null;
    }

    return new DomainAppointment({
      id: repositoryAppointment.id,
      date: repositoryAppointment.date,
      doctorId: repositoryAppointment.doctorId,
      patientId: repositoryAppointment.patientId,
    });
  }

  async save(appointment: DomainAppointment): Promise<void> {
    await this.database.appointment.create({
      data: {
        id: appointment.id,
        date: appointment.date,
        doctorId: appointment.doctorId,
        patientId: appointment.patientId,
      },
    });
  }

  async findByPatientId(patientId: string): Promise<DomainAppointment | null> {
    const repositoryAppointment = await this.database.appointment.findFirst({
      where: { patientId },
    });

    return AppointmentPrismaRepository.mapRepositoryAppointmentToDomainAppointment(
      repositoryAppointment
    );
  }
}
