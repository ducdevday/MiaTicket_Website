import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_URL } from '../const/environment';
import ExportOrderReportRequest from '../dto/model/export-order-report-request';
import CreateOrderRequest from '../dto/request/create-order-request';
import GetMyOrdersRequest from '../dto/request/get-my-orders-request';
import GetOrderReportRequest from '../dto/request/get-order-report-request';
import GetOrderSummaryRevenueRequest from '../dto/request/get-order-summary-revenue-request';
import CancelOrderResponse from '../dto/response/cancel-order-response';
import CreateOrderResponse from '../dto/response/create-order-response';
import GetMyOrdersResponse from '../dto/response/get-my-orders-response';
import GetOrderDetailResponse from '../dto/response/get-order-detail-response';
import GetOrderReportResponse from '../dto/response/get-order-report-response';
import GetOrderSummaryRevenueResponse from '../dto/response/get-order-summary-revenue-response';
import GetOrderSummaryFigureResponse from '../dto/response/get-order-summary-figure-response';
import GetOrderSummaryFiguresRequest from '../dto/request/get-order-summary-figure-request';

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

  getOrderSummaryRevenue(
    eventId: number,
    request: GetOrderSummaryRevenueRequest
  ) {
    const params = new HttpParams({ fromObject: { ...request } });
    return this.http.get<GetOrderSummaryRevenueResponse>(
      `${this.BASE_ORDER_URL}/events/${eventId}/summary-revenue`,
      {
        params,
      }
    );
  }

  getOrderSummaryFigure(
    eventId: number,
    request: GetOrderSummaryFiguresRequest
  ) {
    const params = new HttpParams({ fromObject: { ...request } });
    return this.http.get<GetOrderSummaryFigureResponse>(
      `${this.BASE_ORDER_URL}/events/${eventId}/summary-figures`,
      {
        params,
      }
    );
  }
}
