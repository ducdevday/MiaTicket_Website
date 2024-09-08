import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginRequest } from '../dto/request/login-request';
import { LoginResponse } from '../dto/response/login-response';
import { CreateAccountRequest } from '../dto/request/create-account-request';
import { CreateAccountResponse } from '../dto/response/create-account-response';
import { LogoutRequest } from '../dto/request/logout-request';
import { LogoutResponse } from '../dto/response/logout-response';
import ChangePasswordRequest from '../dto/request/change-password-request';
import ChangePasswordResponse from '../dto/response/change-password-response';
import { BASE_URL } from '../const/environment';
import UpdateAccountRequest from '../dto/request/update-account-request';
import UpdateAccountResponse from '../dto/response/update-account-response';
import ActivateAccountRequest from '../dto/request/activate-account-request';
import ActivateAccountResponse from '../dto/response/activate-account-response';
import ResetPasswordRequest from '../dto/request/reset-password-request';
import ResetPasswordResponse from '../dto/response/reset-password-response';

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
  constructor(http: HttpClient) {
    this.http = http;
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
