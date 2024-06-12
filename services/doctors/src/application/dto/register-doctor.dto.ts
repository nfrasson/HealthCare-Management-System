export class RegisterDoctorDto {
  name: string;
  email: string;
  password: string;
  specialities: string[];

  constructor(input: any) {
    this.name = input.name;
    this.email = input.email;
    this.password = input.password;
    this.specialities = input.specialities;
  }

  validate() {
    if (!this?.name) {
      throw new Error("Name is required");
    }
    if (!this?.email) {
      throw new Error("Email is required");
    }
    if (!this?.password) {
      throw new Error("Password is required");
    }
    if (!this?.specialities) {
      throw new Error("Date of birth is required");
    }
  }
}
