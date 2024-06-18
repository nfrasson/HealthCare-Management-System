export interface IPatientGateway {
    existsById(patientId: string): Promise<boolean>;
}