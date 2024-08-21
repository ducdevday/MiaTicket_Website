export class CreateAccountRequest {
  name!: string;
  email!: string;
  password!: string;
  phoneNumber!: string;
  birthDate!: string;
  gender!: number;
  constructor(
    name: string,
    email: string,
    password: string,
    phoneNumber: string,
    birthDate: string,
    gender: number
  ) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.phoneNumber = phoneNumber;
    this.birthDate = birthDate;
    this.gender = gender;
  }
}
