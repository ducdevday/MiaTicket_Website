import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import CreateOrderRequest from '../dto/request/create-order-request';
import { BASE_URL } from '../const/environment';
import CreateOrderResponse from '../dto/response/create-order-response';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  http!: HttpClient;
  private BASE_ORDER_URL = `${BASE_URL}/order`;
  constructor(http: HttpClient) {
    this.http = http;
  }

  createOrder(createOrderRequest: CreateOrderRequest) {
    return this.http.post<CreateOrderResponse>(
      `${this.BASE_ORDER_URL}`,
      createOrderRequest
    );
  }
}
