import { PrismaClient } from "@prisma/client";
import { Consultation as DomainConsultation } from "@core/entities/consultation.entity";
import { IConsultationRepository } from "@core/interfaces/repositories/consultation.repository.interface";

export class ConsultationPrismaRepository implements IConsultationRepository {
  constructor(private readonly database: PrismaClient) {}

  async save(consultation: DomainConsultation): Promise<void> {
    await this.database.consultation.create({
      data: {
        id: consultation.id,
        date: consultation.date,
        doctorId: consultation.doctorId,
        patientId: consultation.patientId,
        specialty: consultation.specialty,
      },
    });
  }

  async alreadyScheduled(
    patientId: string,
    doctorId: string,
    specialty: string
  ): Promise<boolean> {
    const consultation = await this.database.consultation.findFirst({
      where: {
        patientId,
        doctorId,
        specialty,
      },
      select: { id: true },
    });

    return !!consultation;
  }
}
