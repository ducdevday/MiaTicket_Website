import { Role } from '../enum/role';
import { UserModel } from './user-model';

export class LoginDataDto {
  accessToken!: string;
  userId!: string;
  role!: Role;
}
