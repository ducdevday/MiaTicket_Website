import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import DropDownModel from '../../dto/model/drop-down-model';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../../service/event.service';
import { OrganizerService } from '../../service/organizer.service';
import CurrencyUtil from '../../utils/currency-util';
import { HttpErrorResponse } from '@angular/common/http';
import { TimeUtil } from '../../utils/time-util';
import GetOrderReportResponse from '../../dto/response/get-order-report-response';
import GetOrderReportRequest from '../../dto/request/get-order-report-request';
import PaginationModel from '../../dto/model/pagination-model';
import { OrderService } from '../../service/order.service';
import OrderReportDto from '../../dto/model/order-report-dto';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { PaymentType } from '../../dto/enum/payment-type';
import TicketReportDto from '../../dto/model/ticket-report-dto';
import { PaymentStatus } from '../../dto/enum/payment-status';
import ExportOrderReportRequest from '../../dto/model/export-order-report-request';

@Component({
  selector: 'app-order-report',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    DropdownModule,
    FormsModule,
    TableModule,
    PaginatorModule,
  ],
  templateUrl: './order-report.component.html',
  styleUrl: './order-report.component.scss',
})
export class OrderReportComponent {
  eventId!: number;
  eventName!: string;
  showTimeId!: number;
  showTimes: DropDownModel[] = [];
  showTimeChosen?: DropDownModel;
  isCheckInFormVisible: boolean = false;

  PAGE_INDEX: number = 1;
  PAGE_SIZE: number = 5;
  pagination!: PaginationModel;

  orders: OrderReportDto[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private eventService: EventService,
    private orderService: OrderService
  ) {
    this.onInitData();
    this.pagination = new PaginationModel(
      this.PAGE_INDEX,
      this.PAGE_SIZE,
      0,
      0
    );
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.getQueryParams(params);
    });
  }

  onInitData() {
    this.eventId = this.route.snapshot.params['eventId'];
    this.fetchEventName();
    this.fetchEventShowTime();
  }

  fetchEventName() {
    this.eventService.getEventName(this.eventId).subscribe({
      next: (response) => {
        this.eventName = response.data;
      },
      error: (err: HttpErrorResponse) => {
        this.eventName = '';
      },
    });
  }

  fetchEventShowTime() {
    this.eventService.getEventShowTime(this.eventId).subscribe({
      next: (response) => {
        this.showTimes = response.data.map(
          (x) =>
            new DropDownModel(
              TimeUtil.formatDateTimeRange(
                TimeUtil.convertUtcTimeToLocalTime(x.showStartAt.toString()),
                TimeUtil.convertUtcTimeToLocalTime(x.showEndAt.toString())
              ),
              x.id
            )
        );
        this.showTimeChosen = this.showTimes.find(
          (x) => x.value == this.showTimeId
        );
      },
      error: (err: HttpErrorResponse) => {
        this.showTimes = [];
      },
    });
  }

  fetchOrderReport(showTimeId: number) {
    var request = new GetOrderReportRequest(
      showTimeId,
      this.pagination.currentPageIndex,
      this.pagination.currentPageSize
    );
    this.orderService.getOrderReport(this.eventId, request).subscribe({
      next: (response) => {
        this.orders = response.data;
        this.pagination.totalRecords = response.totalRecords;
      },
      error: (err: HttpErrorResponse) => {},
    });
  }

  getQueryParams(params: any) {
    this.showTimeId = params.showTimeId;
    if (this.showTimeId != null && !isNaN(this.showTimeId)) {
      this.fetchOrderReport(this.showTimeId);
    }
  }

  setQueryParams(params: any) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: params,
      queryParamsHandling: 'merge',
    });
  }

  onShowTimeChange(selectedShowTime: DropDownModel): void {
    this.showTimeId = selectedShowTime.value;
    this.setQueryParams({ showTimeId: this.showTimeId });
  }

  formatTicketPrice(price: number): string {
    return CurrencyUtil.formatCurrency(price);
  }

  onPageChange(event: any) {
    this.pagination.currentPageIndex = event.page + 1;
    this.fetchOrderReport(this.showTimeId);
  }
  onExportReportButtonPressed() {
    var request = new ExportOrderReportRequest(this.showTimeId);
    this.orderService.exportOrderReport(this.eventId, request).subscribe({
      next: (response) => {
        const blob = new Blob([response], {
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `OrderReport_${
          this.eventId
        }_${new Date().toISOString()}.xlsx`;
        link.click();
      },
      error: (err: HttpErrorResponse) => {},
    });
  }
  imgPaymentMethod(paymentMethod: PaymentType): string {
    switch (paymentMethod) {
      case PaymentType.VnPay:
        return '/ic_vnpay.png';
      case PaymentType.ZaloPay:
        return '/ic_zalopay.png';
    }
  }
  formatPaymentMethod(paymentMethod: PaymentType): string {
    switch (paymentMethod) {
      case PaymentType.VnPay:
        return 'VnPay';
      case PaymentType.ZaloPay:
        return 'ZaloPay';
    }
  }

  formatTickets(tickets: TicketReportDto[]): string {
    return tickets.map((t) => `${t.quantity} x ${t.name}`).join('\n');
  }

  isPaymentPaid(paymentStatus: PaymentStatus): boolean {
    return paymentStatus == PaymentStatus.Paid;
  }

  formatPaymentStatus(paymentStatus: PaymentStatus): string {
    switch (paymentStatus) {
      case PaymentStatus.Paid:
        return 'Paid';
      case PaymentStatus.Unpaid:
        return 'Unpaid';
    }
  }
}
