export class PatientExistsByIdDto {
  patientId: string;

  constructor(input: any) {
    this.patientId = input.patientId;
  }

  validate() {
    if (!this?.patientId) {
      throw new Error("patientId is required");
    }
  }
}
