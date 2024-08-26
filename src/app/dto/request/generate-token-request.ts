export class GenerateTokenRequest {
  refreshToken!: string;
  constructor(refreshToken: string) {
    this.refreshToken = refreshToken;
  }
}
