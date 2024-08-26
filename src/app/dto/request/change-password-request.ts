export default class ChangePasswordRequest {
  userId!: string;
  currentPassword!: string;
  newPassword!: string;
  confirmPassword!: string;

  constructor(
    uid: string,
    currentPassword: string,
    newPassword: string,
    confirmPassword: string
  ) {
    this.userId = uid;
    this.currentPassword = currentPassword;
    this.newPassword = newPassword;
    this.confirmPassword = confirmPassword;
  }
}
