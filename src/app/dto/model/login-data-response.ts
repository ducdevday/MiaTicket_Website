import { UserModel } from './user-model';

export class LoginDataResponse {
  accessToken!: string;
  refreshToken!: string;
  user!: UserModel;

  constructor(accessToken: string, refreshToken: string, user: UserModel) {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
    this.user = user;
  }
}
