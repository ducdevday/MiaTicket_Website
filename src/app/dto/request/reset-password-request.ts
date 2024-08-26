export default class ResetPasswordRequest {
  email!: string;
  code!: string;
  newPassword!: string;
  confirmPassword!: string;
  constructor(
    email: string,
    code: string,
    newPassword: string,
    confirmPassword: string
  ) {
    this.email = email;
    this.code = code;
    this.newPassword = newPassword;
    this.confirmPassword = confirmPassword;
  }
}
