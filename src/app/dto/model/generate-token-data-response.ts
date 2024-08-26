export class GenerateTokenDataResponse {
  accessToken!: string;

  constructor(accessToken: string) {
    this.accessToken = accessToken;
  }
}
