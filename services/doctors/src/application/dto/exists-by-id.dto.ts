export class DoctorExistsByIdDto {
  doctorId: string;

  constructor(input: any) {
    this.doctorId = input.name;
  }

  validate() {
    if (!this?.doctorId) {
      throw new Error("doctorId is required");
    }
  }
}
