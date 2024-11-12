import { Gender } from '../enum/gender';
import { Role } from '../enum/role';

export class CreateAccountRequest {
  name!: string;
  email!: string;
  password!: string;
  confirmPassword!: string;
  phoneNumber!: string;
  birthDate!: string;
  gender!: Gender;
  role!: Role;
  constructor(
    name: string,
    email: string,
    password: string,
    confirmPassword: string,
    phoneNumber: string,
    birthDate: string,
    gender: Gender,
    role: Role
  ) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.confirmPassword = confirmPassword;
    this.phoneNumber = phoneNumber;
    this.birthDate = birthDate;
    this.gender = gender;
    this.role = role;
  }
}
