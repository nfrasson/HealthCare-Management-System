import { Consultation, PrismaClient } from "@prisma/client";
import { Consultation as DomainConsultation } from "@core/entities/consultation.entity";
import { IConsultationRepository } from "@core/interfaces/repositories/consultation.repository.interface";

export class ConsultationPrismaRepository implements IConsultationRepository {
  constructor(private readonly database: PrismaClient) {}

  private static mapRepositoryConsultationToDomainConsultation(
    repositoryConsultation: Consultation
  ): DomainConsultation {
    if (!repositoryConsultation) {
      return null;
    }

    return new DomainConsultation({
      id: repositoryConsultation.id,
      date: repositoryConsultation.date,
      doctorId: repositoryConsultation.doctorId,
      patientId: repositoryConsultation.patientId,
      specialty: repositoryConsultation.specialty,
    });
  }

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

  async findByPatientId(patientId: string): Promise<DomainConsultation | null> {
    const repositoryConsultation = await this.database.consultation.findFirst({
      where: { patientId },
    });

    return ConsultationPrismaRepository.mapRepositoryConsultationToDomainConsultation(
      repositoryConsultation
    );
  }
}
