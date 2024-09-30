import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_URL } from '../const/environment';
import UpdatePaymentVnPayRequest from '../dto/request/update-payment-vnpay-request';
import UpdatePaymentVnPayResponse from '../dto/response/update-payment-vnpay-response';
import UpdatePaymentZaloPayResponse from '../dto/response/update-payment-zalopay-response';
import UpdatePaymentZalopayRequest from '../dto/request/update-payment-zalopay-request';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  http!: HttpClient;
  private BASE_PAYMENT_URL = `${BASE_URL}/payment`;
  private VNPAY_URL = 'vnpay';
  private ZALOPAY_URL = 'zalopay';
  constructor(http: HttpClient) {
    this.http = http;
  }

  updateVnPayPayment(updatePaymentVnPayRequest: UpdatePaymentVnPayRequest) {
    return this.http.patch<UpdatePaymentVnPayResponse>(
      `${this.BASE_PAYMENT_URL}/${this.VNPAY_URL}`,
      updatePaymentVnPayRequest
    );
  }

  updateZaloPayRequest(updateZaloPayRequest: UpdatePaymentZalopayRequest) {
    return this.http.patch<UpdatePaymentZaloPayResponse>(
      `${this.BASE_PAYMENT_URL}/${this.ZALOPAY_URL}`,
      updateZaloPayRequest
    );
  }
}
