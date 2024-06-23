import { IHttpService } from "@core/interfaces/services/http.interface";
import { IPatientGateway } from "@core/interfaces/gateways/patient.gateway";

export class PatientGateway implements IPatientGateway {
  constructor(private httpService: IHttpService) {}

  async existsById(patientId: string): Promise<boolean> {
    try {
      await this.httpService.get(
        `${process.env.PATIENT_API_URL}/patients/${patientId}/exists`
      );
      return true;
    } catch (error) {
      return false;
    }
  }
}
