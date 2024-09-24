import { Component, OnInit } from '@angular/core';
import { NotFoundComponent } from '../../common/not-found/not-found.component';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { HOME_PATH } from '../../app.routes';
import { ProcessingService } from '../../service/processing.service';
import { PaymentService } from '../../service/payment.service';
import UpdatePaymentVnPayRequest from '../../dto/request/update-payment-vnpay-request';
import { PageState } from '../../dto/enum/page-state';
import VnPayInformationModel from '../../dto/model/vnpay-information-model';
import { SpinnerComponent } from '../../common/spinner/spinner.component';
import { OrderStatus } from '../../dto/enum/order-status';
import CurrencyUtil from '../../utils/currency-util';
import { TimeUtil } from '../../utils/time-util';

@Component({
  selector: 'app-payment-information',
  standalone: true,
  imports: [CommonModule, NotFoundComponent, SpinnerComponent],
  templateUrl: './payment-information.component.html',
  styleUrl: './payment-information.component.scss',
})
export class PaymentInformationComponent implements OnInit {
  vnPayInformation!: VnPayInformationModel;
  pageState: PageState = PageState.Init;
  constructor(
    private paymentService: PaymentService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      var transactionCode = params['vnp_TxnRef'];
      var transactionDate = params['vnp_PayDate'];
      this.fetchUpdatePayment(transactionCode, transactionDate);
    });
  }

  fetchUpdatePayment(transactionCode: string, transactionDate: string) {
    var updatePaymentRequest = new UpdatePaymentVnPayRequest(
      transactionCode,
      transactionDate
    );
    this.pageState = PageState.Loading;
    this.paymentService.updatePayment(updatePaymentRequest).subscribe({
      next: (response) => {
        this.vnPayInformation = response.data;
        this.pageState = PageState.Success;
      },
      error: (response) => {
        this.pageState = PageState.Error;
      },
    });
  }

  isPaymentError() {
    return this.pageState == PageState.Error;
  }

  goToHome() {
    this.router.navigate([HOME_PATH]);
  }

  getPaymentImage() {
    switch (this.vnPayInformation?.orderStatus) {
      case OrderStatus.Pending:
        return '/icon-processing.png';
      case OrderStatus.Finished:
        return '/icon-success.png';
      case OrderStatus.Canceled:
        return '/icon-fail.png';
      default:
        return '/icon-processing.png';
    }
  }

  getPaymentContent() {
    switch (this.vnPayInformation?.orderStatus) {
      case OrderStatus.Pending:
        return 'Payment In Processing';
      case OrderStatus.Finished:
        return 'Payment Succeed. We send code of order into your email';
      case OrderStatus.Canceled:
        return 'Payment Canceled';
      default:
        return 'Payment In Processing';
    }
  }

  formattedTransactionCode() {
    return this.vnPayInformation?.transactionCode ?? '';
  }

  formattedTotalAmount() {
    return this.vnPayInformation
      ? CurrencyUtil.formatCurrency(this.vnPayInformation.totalAmount)
      : '';
  }

  formattedCreatedAt() {
    return this.vnPayInformation
      ? TimeUtil.formatShortDateTime(
          TimeUtil.convertUtcTimeToLocalTime(
            this.vnPayInformation.createdAt.toString()
          )
        )
      : '';
  }
}
