import { UserModel } from './user-model';

export class LoginDataResponse {
  accessToken!: string;
  user!: UserModel;

  constructor(accessToken: string, user: UserModel) {
    this.accessToken = accessToken;
    this.user = user;
  }
}
