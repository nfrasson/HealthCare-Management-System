import { Patient, PrismaClient } from "@prisma/client";
import { Patient as DomainPatient } from "@core/entities/patient.entity";
import { IPatientRepository } from "@core/interfaces/repositories/patient.repository.interface";

export class PatientPrismaRepository implements IPatientRepository {
  constructor(private readonly database: PrismaClient) {}

  private static mapRepositoryPatientToDomainPatient(
    repositoryPatient: Patient
  ): DomainPatient {
    if (!repositoryPatient) {
      return null;
    }

    return new DomainPatient({
      id: repositoryPatient.id,
      name: repositoryPatient.name,
      email: repositoryPatient.email,
      password: repositoryPatient.password,
      registeredAt: repositoryPatient.registeredAt,
      dateOfBirth: repositoryPatient.dateOfBirth,
    });
  }

  async save(patient: DomainPatient): Promise<void> {
    await this.database.patient.create({
      data: {
        id: patient.id,
        name: patient.name,
        email: patient.email,
        password: patient.password,
        registeredAt: patient.registeredAt,
        dateOfBirth: new Date(patient.dateOfBirth).toISOString(),
      },
    });
  }

  async findByEmail(email: string): Promise<DomainPatient | null> {
    const repositoryPatient = await this.database.patient.findUnique({
      where: { email },
    });

    return PatientPrismaRepository.mapRepositoryPatientToDomainPatient(
      repositoryPatient
    );
  }
}
