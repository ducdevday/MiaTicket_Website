import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../service/order.service';
import OrderDetailModel from '../../dto/model/order-detail-model';
import { PageState } from '../../dto/enum/page-state';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TimeUtil } from '../../utils/time-util';
import { OrderStatus } from '../../dto/enum/order-status';
import { PaymentType } from '../../dto/enum/payment-type';
import CurrencyUtil from '../../utils/currency-util';
import { ConfirmService } from '../../service/confirm.service';
import { ToastService } from '../../service/toast.service';

@Component({
  selector: 'app-order-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-detail.component.html',
  styleUrl: './order-detail.component.scss',
})
export class OrderDetailComponent implements OnInit {
  order!: OrderDetailModel;

  pageState: PageState = PageState.Init;
  constructor(
    private orderService: OrderService,
    private confirmService: ConfirmService,
    private toastService: ToastService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    var orderId = this.route.snapshot.paramMap.get('orderId');
    if (orderId) {
      this.fetchOrderDetailData(orderId);
    }
  }

  fetchOrderDetailData(orderId: string) {
    this.pageState = PageState.Loading;
    this.orderService.getOrderDetail(orderId).subscribe({
      next: (response) => {
        this.order = response.data;
        this.pageState = PageState.Success;
      },
      error: (err) => {
        this.pageState = PageState.Error;
      },
    });
  }

  isPageLoadInprogress() {
    return this.pageState === PageState.Loading;
  }

  isPageLoadSuccess() {
    return this.pageState == PageState.Success;
  }

  isPageLoadError() {
    return this.pageState == PageState.Error;
  }

  formatDateRage(date1: Date, date2: Date) {
    return TimeUtil.formatDateTimeRange(
      TimeUtil.convertUtcTimeToLocalTime(date1.toString()),
      TimeUtil.convertUtcTimeToLocalTime(date2.toString())
    );
  }

  formatDate(date: Date) {
    return TimeUtil.formatShortDateTime(
      TimeUtil.convertUtcTimeToLocalTime(date.toString())
    );
  }

  isOrderFinished() {
    return this.order.orderStatus == OrderStatus.Finished;
  }

  getOrderStatusImage() {
    switch (this.order.orderStatus) {
      case OrderStatus.Pending:
        return '/icon-processing.png';
      case OrderStatus.Finished:
        return '/icon-success.png';
      case OrderStatus.Canceled:
        return '/icon-fail.png';
    }
  }

  getOrderStatusText() {
    switch (this.order.orderStatus) {
      case OrderStatus.Pending:
        return 'Order Pending';
      case OrderStatus.Finished:
        return 'Order Finished';
      case OrderStatus.Canceled:
        return 'Order Canceled';
    }
  }

  getPaymentTypeImage() {
    switch (this.order.paymentType) {
      case PaymentType.VnPay:
        return '/ic_vnpay.png';
      case PaymentType.ZaloPay:
        return '/ic_zalopay.png';
    }
  }

  getPaymentTypeText() {
    switch (this.order.paymentType) {
      case PaymentType.VnPay:
        return 'VnPay';
      case PaymentType.ZaloPay:
        return 'ZaloPay';
    }
  }

  formatCurrency(price: number) {
    return CurrencyUtil.formatCurrency(price);
  }

  onRepayment(paymentUrl: string) {
    window.open(paymentUrl, '_blank');
  }

  onCancelOrder(event: Event) {
    var orderId = this.order.id.toString();
    this.confirmService.confirmCancel(event, () => {
      this.orderService.cancelOrder(orderId).subscribe({
        next: (response) => {
          this.toastService.showSuccess('Order Canceled Success');
          this.fetchOrderDetailData(orderId);
        },
        error: (err) => {
          this.toastService.showError(
            'Order Canceled Failed. Please try again'
          );
        },
      });
    });
  }
}
