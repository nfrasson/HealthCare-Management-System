export class RegisterPatientDto {
  name: string;
  email: string;
  password: string;
  dateOfBirth: Date;

  constructor(input: any) {
    this.name = input.name;
    this.email = input.email;
    this.password = input.password;
    this.dateOfBirth = input.dateOfBirth;
  }

  validate() {
    if (!this?.name) {
      throw new Error("Name is required");
    }
    if (!this?.dateOfBirth) {
      throw new Error("Date of birth is required");
    }
    if (!this?.email) {
      throw new Error("Email is required");
    }
    if (!this?.password) {
      throw new Error("Password is required");
    }
  }
}
