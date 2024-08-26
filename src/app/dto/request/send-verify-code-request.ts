export default class SendVerifyCodeRequest {
  email!: string;
  type!: number;
  constructor(email: string, verifyType: number) {
    this.email = email;
    this.type = verifyType;
  }
}
