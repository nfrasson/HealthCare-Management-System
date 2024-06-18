export interface IDoctorGateway {
    existsById(doctorId: string): Promise<boolean>;
    validateSpecialty(doctorId: string, specialty: string): Promise<boolean>;
}