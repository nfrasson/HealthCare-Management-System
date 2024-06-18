import { IHttpService } from "@core/interfaces/services/http.interface";
import { IDoctorGateway } from "@core/interfaces/gateways/doctor.gateway";
import { Doctor } from "@core/entities/doctor.entity";

export class DoctorGateway implements IDoctorGateway {
  constructor(private httpService: IHttpService) {}

  private mapToDoctor(doctor: any): Doctor | undefined {
    return doctor && new Doctor(doctor);
  }

  async existsById(doctorId: string): Promise<boolean> {
    try {
      await this.httpService.get(
        `${process.env.DOCTOR_API_URL}/doctors/${doctorId}`
      );
      return true;
    } catch (error) {
      return false;
    }
  }

  async validateSpecialty(
    doctorId: string,
    specialty: string
  ): Promise<boolean> {
    try {
      const response = await this.httpService.get(
        `${process.env.DOCTOR_API_URL}/doctors/${doctorId}`
      );

      const doctor = this.mapToDoctor(response);

      return doctor.hasSpecialty(specialty);
    } catch (error) {
      return false;
    }
  }
}
