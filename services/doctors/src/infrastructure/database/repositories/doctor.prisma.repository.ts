import { Doctor, PrismaClient } from "@prisma/client";
import { Doctor as DomainDoctor } from "@core/entities/doctor.entity";
import { IDoctorRepository } from "@core/interfaces/repositories/doctor.repository.interface";

export class DoctorPrismaRepository implements IDoctorRepository {
  constructor(private readonly database: PrismaClient) {}

  private static mapRepositoryDoctorToDomainDoctor(
    repositoryDoctor: Doctor
  ): DomainDoctor {
    if (!repositoryDoctor) {
      return null;
    }

    return new DomainDoctor({
      id: repositoryDoctor.id,
      name: repositoryDoctor.name,
      email: repositoryDoctor.email,
      password: repositoryDoctor.password,
      registedAt: repositoryDoctor.registedAt,
      specialties: repositoryDoctor.specialties,
    });
  }

  async save(doctor: DomainDoctor): Promise<void> {
    await this.database.doctor.create({
      data: {
        id: doctor.id,
        name: doctor.name,
        email: doctor.email,
        password: doctor.password,
        registedAt: doctor.registedAt,
        specialties: doctor.specialties,
      },
    });
  }

  async existsById(doctorId: string): Promise<boolean> {
    const repositoryDoctor = await this.database.doctor.findUnique({
      where: { id: doctorId },
    });

    return !!repositoryDoctor;
  }

  async findByEmail(email: string): Promise<DomainDoctor | null> {
    const repositoryDoctor = await this.database.doctor.findUnique({
      where: { email },
    });

    return DoctorPrismaRepository.mapRepositoryDoctorToDomainDoctor(
      repositoryDoctor
    );
  }
}
