export class LogoutRequest {
  userId!: string;

  constructor(userId: string) {
    this.userId = userId;
  }
}
