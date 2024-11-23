import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import CreateOrderRequest from '../dto/request/create-order-request';
import { BASE_URL } from '../const/environment';
import CreateOrderResponse from '../dto/response/create-order-response';
import GetMyOrdersRequest from '../dto/request/get-my-orders-request';
import GetMyEventResponse from '../dto/response/get-my-events-response';
import GetOrderDetailResponse from '../dto/response/get-order-detail-response';
import GetMyOrdersResponse from '../dto/response/get-my-orders-response';
import CancelOrderResponse from '../dto/response/cancel-order-response';
import GetOrderReportRequest from '../dto/request/get-order-report-request';
import GetOrderReportResponse from '../dto/response/get-order-report-response';
import ExportOrderReportRequest from '../dto/model/export-order-report-request';
import ExportOrderReportResponse from '../dto/response/export-order-report-response';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  http!: HttpClient;
  private BASE_ORDER_URL = `${BASE_URL}/order`;
  private MY_ORDERS_URL = `my-orders`;
  private ORDER_DETAIL_URL = `detail`;
  private CANCEL_ORDER_URL = `cancel`;
  constructor(http: HttpClient) {
    this.http = http;
  }

  createOrder(createOrderRequest: CreateOrderRequest) {
    return this.http.post<CreateOrderResponse>(
      `${this.BASE_ORDER_URL}`,
      createOrderRequest
    );
  }

  getMyOrders(getMyOrdersRequest: GetMyOrdersRequest) {
    const params = new HttpParams({ fromObject: { ...getMyOrdersRequest } });
    return this.http.get<GetMyOrdersResponse>(
      `${this.BASE_ORDER_URL}/${this.MY_ORDERS_URL}`,
      { params }
    );
  }

  getOrderDetail(orderId: string) {
    return this.http.get<GetOrderDetailResponse>(
      `${this.BASE_ORDER_URL}/${this.ORDER_DETAIL_URL}/${orderId}`
    );
  }

  cancelOrder(orderId: string) {
    return this.http.patch<CancelOrderResponse>(
      `${this.BASE_ORDER_URL}/${this.CANCEL_ORDER_URL}/${orderId}`,
      null
    );
  }

  getOrderReport(eventId: number, request: GetOrderReportRequest) {
    const params = new HttpParams({ fromObject: { ...request } });
    return this.http.get<GetOrderReportResponse>(
      `${this.BASE_ORDER_URL}/events/${eventId}/report`,
      {
        params,
      }
    );
  }

  exportOrderReport(
    eventId: number,
    request: ExportOrderReportRequest
  ): Observable<Blob> {
    const params = new HttpParams({ fromObject: { ...request } });
    return this.http.get(
      `${this.BASE_ORDER_URL}/events/${eventId}/export-report`,
      {
        params,
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
        responseType: 'blob',
      }
    );
  }
}
