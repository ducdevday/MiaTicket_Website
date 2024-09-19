import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_URL } from '../const/environment';
import ActivateAccountRequest from '../dto/request/activate-account-request';
import ChangePasswordRequest from '../dto/request/change-password-request';
import { CreateAccountRequest } from '../dto/request/create-account-request';
import { LoginRequest } from '../dto/request/login-request';
import ResetPasswordRequest from '../dto/request/reset-password-request';
import UpdateAccountRequest from '../dto/request/update-account-request';
import ActivateAccountResponse from '../dto/response/activate-account-response';
import ChangePasswordResponse from '../dto/response/change-password-response';
import { CreateAccountResponse } from '../dto/response/create-account-response';
import GetAccountInformationResponse from '../dto/response/get-account-information-response';
import { LoginResponse } from '../dto/response/login-response';
import { LogoutResponse } from '../dto/response/logout-response';
import ResetPasswordResponse from '../dto/response/reset-password-response';
import UpdateAccountResponse from '../dto/response/update-account-response';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  http!: HttpClient;
  private BASE_ACCOUNT_URL = `${BASE_URL}/account`;
  private LOGIN_URL = 'login';
  private LOGOUT_URL = 'logout';
  private CHANGE_PASSWORD_URL = `change-password`;
  private RESET_PASSWORD_URL = `reset-password`;
  private ACTIVATE_ACCOUNT_URL = `activate`;
  private ACCOUNT_INFORMATION_URL = `information`;

  constructor(http: HttpClient) {
    this.http = http;
  }

  getAccountInformation() {
    return this.http.get<GetAccountInformationResponse>(
      `${this.BASE_ACCOUNT_URL}/${this.ACCOUNT_INFORMATION_URL}`
    );
  }

  login(loginRequest: LoginRequest) {
    return this.http.post<LoginResponse>(
      `${this.BASE_ACCOUNT_URL}/${this.LOGIN_URL}`,
      loginRequest
    );
  }

  logout() {
    return this.http.post<LogoutResponse>(
      `${this.BASE_ACCOUNT_URL}/${this.LOGOUT_URL}`,
      null
    );
  }
  createAccount(createAccountRequest: CreateAccountRequest) {
    return this.http.post<CreateAccountResponse>(
      `${this.BASE_ACCOUNT_URL}`,
      createAccountRequest
    );
  }
  updateAccount(id: String, updateAccountRequest: UpdateAccountRequest) {
    return this.http.put<UpdateAccountResponse>(
      `${this.BASE_ACCOUNT_URL}/${id}`,
      updateAccountRequest
    );
  }

  activateAccount(activateAccountRequest: ActivateAccountRequest) {
    return this.http.patch<ActivateAccountResponse>(
      `${this.BASE_ACCOUNT_URL}/${this.ACTIVATE_ACCOUNT_URL}`,
      activateAccountRequest
    );
  }

  changePassword(changePasswordRequest: ChangePasswordRequest) {
    return this.http.patch<ChangePasswordResponse>(
      `${this.BASE_ACCOUNT_URL}/${this.CHANGE_PASSWORD_URL}`,
      changePasswordRequest
    );
  }

  resetPassword(resetPasswordRequest: ResetPasswordRequest) {
    return this.http.patch<ResetPasswordResponse>(
      `${this.BASE_ACCOUNT_URL}/${this.RESET_PASSWORD_URL}`,
      resetPasswordRequest
    );
  }
}
