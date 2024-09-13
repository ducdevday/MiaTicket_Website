import { UserModel } from './user-model';

export class LoginDataResponse {
  accessToken!: string;
  user!: UserModel;
}
