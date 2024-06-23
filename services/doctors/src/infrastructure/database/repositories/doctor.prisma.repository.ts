import { Doctor, PrismaClient } from "@prisma/client";
import { DoctorSpecialty, Doctor as DomainDoctor } from "@core/entities/doctor.entity";
import { IDoctorRepository } from "@core/interfaces/repositories/doctor.repository.interface";

export class DoctorPrismaRepository implements IDoctorRepository {
  constructor(private readonly database: PrismaClient) {}

  private static mapRepositoryDoctorToDomainDoctor(
    repositoryDoctor: Partial<Doctor>
  ): DomainDoctor {
    if (!repositoryDoctor) {
      return null;
    }

    return new DomainDoctor({
      id: repositoryDoctor.id,
      name: repositoryDoctor.name,
      email: repositoryDoctor.email,
      password: repositoryDoctor.password,
      registeredAt: repositoryDoctor.registeredAt,
      specialties: repositoryDoctor.specialties as DoctorSpecialty[],
    });
  }

  async save(doctor: DomainDoctor): Promise<void> {
    await this.database.doctor.create({
      data: {
        id: doctor.id,
        name: doctor.name,
        email: doctor.email,
        password: doctor.password,
        registeredAt: doctor.registeredAt,
        specialties: doctor.specialties,
      },
    });
  }

  async existsById(doctorId: string): Promise<boolean> {
    const repositoryDoctor = await this.database.doctor.findUnique({
      where: { id: doctorId },
      select: { id: true },
    });

    return !!repositoryDoctor;
  }

  async findById(doctorId: string): Promise<DomainDoctor | null> {
    const repositoryDoctor = await this.database.doctor.findUnique({
      where: { id: doctorId },
      select: {
        name: true,
        email: true,
        password: true,
        specialties: true,
        registeredAt: true,
      },
    });

    return DoctorPrismaRepository.mapRepositoryDoctorToDomainDoctor(
      repositoryDoctor
    );
  }
}
