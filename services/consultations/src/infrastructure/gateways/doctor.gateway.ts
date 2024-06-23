import { IHttpService } from "@core/interfaces/services/http.interface";
import { IDoctorGateway } from "@core/interfaces/gateways/doctor.gateway";

export class DoctorGateway implements IDoctorGateway {
  constructor(private httpService: IHttpService) {}

  async existsById(doctorId: string): Promise<boolean> {
    try {
      await this.httpService.get(
        `${process.env.DOCTOR_API_URL}/doctors/${doctorId}/exists`
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
      const response = await this.httpService.get<{ hasSpecialty: boolean }>(
        `${process.env.DOCTOR_API_URL}/doctors/${doctorId}/specialties/${specialty}`
      );

      return !!response?.hasSpecialty;
    } catch (error) {
      return false;
    }
  }
}
