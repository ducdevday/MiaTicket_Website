export default class UseVerifyCodeRequest {
  email!: string;
  code!: string;
  type!: number;
  constructor(email: string, code: string, type: number) {
    this.email = email;
    this.code = code;
    this.type = type;
  }
}
