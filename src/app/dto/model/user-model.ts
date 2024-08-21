export class UserModel {
  id!: string;
  name!: string;
  avatarUrl!: string;
  birthDate!: Date;
  email!: string;
  gender!: number;
  phoneNumber!: string;
  constructor(
    id: string,
    name: string,
    avatarUrl: string,
    birthDate: Date,
    email: string,
    gender: number
  ) {
    this.id = id;
    this.name = name;
    this.avatarUrl = avatarUrl;
    this.birthDate = birthDate;
    this.email = email;
    this.gender = gender;
  }
}
