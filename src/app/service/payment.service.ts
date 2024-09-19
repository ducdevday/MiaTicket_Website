import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_URL } from '../const/environment';
import UpdatePaymentVnPayRequest from '../dto/request/update-payment-vnpay-request';
import UpdatePaymentVnPayResponse from '../dto/response/update-payment-vnpay-response';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  http!: HttpClient;
  private BASE_PAYMENT_URL = `${BASE_URL}/payment`;
  private VNPAY_URL = 'vnpay';
  constructor(http: HttpClient) {
    this.http = http;
  }

  updatePayment(updatePaymentVnPayRequest: UpdatePaymentVnPayRequest) {
    return this.http.patch<UpdatePaymentVnPayResponse>(
      `${this.BASE_PAYMENT_URL}/${this.VNPAY_URL}`,
      updatePaymentVnPayRequest
    );
  }
}
