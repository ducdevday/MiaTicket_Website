import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_URL } from '../const/environment';
import SendVerifyCodeRequest from '../dto/request/send-verify-code-request';
import SendVerifyCodeResponse from '../dto/response/send-verify-code-response';
import UseVerifyCodeRequest from '../dto/request/use-verify-code-request';
import UseVerifyCodeResponse from '../dto/response/use-verify-code-response';

@Injectable({
  providedIn: 'root',
})
export class VerifyCodeService {
  http!: HttpClient;
  private BASE_VERIFY_CODE_URL = `${BASE_URL}/verify-code`;
  private SEND_URL = `send`;
  private USE_URL = `use`;
  constructor(http: HttpClient) {
    this.http = http;
  }

  sendVerifyCode(sendVerifyCodeRequest: SendVerifyCodeRequest) {
    return this.http.post<SendVerifyCodeResponse>(
      `${this.BASE_VERIFY_CODE_URL}/${this.SEND_URL}`,
      sendVerifyCodeRequest
    );
  }

  useVerifyCode(useVerifyCodeRequest: UseVerifyCodeRequest) {
    return this.http.patch<UseVerifyCodeResponse>(
      `${this.BASE_VERIFY_CODE_URL}/${this.USE_URL}`,
      useVerifyCodeRequest
    );
  }
}
