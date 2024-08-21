import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginRequest } from '../dto/request/login-request';
import { LoginResponse } from '../dto/response/login-response';
import { CREATE_ACCOUNT_URL, LOGIN_URL } from '../const/environment';
import { CreateAccountRequest } from '../dto/request/create-account-request';
import { CreateAccountResponse } from '../dto/response/create-account-response';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  http!: HttpClient;
  constructor(http: HttpClient) {
    this.http = http;
  }

  login(loginRequest: LoginRequest) {
    return this.http.post<LoginResponse>(LOGIN_URL, loginRequest);
  }

  createAccount(createAccountRequest: CreateAccountRequest) {
    return this.http.post<CreateAccountResponse>(
      CREATE_ACCOUNT_URL,
      createAccountRequest
    );
  }
}
