import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GenerateTokenResponse } from '../dto/response/generate-token-response';
import { GenerateTokenRequest } from '../dto/request/generate-token-request';
import { BASE_URL } from '../const/environment';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  http!: HttpClient;
  private BASE_TOKEN_URL = `${BASE_URL}/token`;
  private GENERATE_TOKEN_URL = `refresh`;
  constructor(http: HttpClient) {
    this.http = http;
  }

  generateToken() {
    return this.http.post<GenerateTokenResponse>(
      `${this.BASE_TOKEN_URL}/${this.GENERATE_TOKEN_URL}`,
      null
    );
  }
}
