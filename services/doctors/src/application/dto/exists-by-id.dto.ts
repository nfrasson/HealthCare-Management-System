export class DoctorExistsByIdDto {
  doctorId: string;

  constructor(input: any) {
    this.doctorId = input.doctorId;
  }

  validate() {
    if (!this?.doctorId) {
      throw new Error("doctorId is required");
    }
  }
}
