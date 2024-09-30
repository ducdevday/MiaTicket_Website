import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HOME_PATH } from '../../app.routes';
import { NotFoundComponent } from '../../common/not-found/not-found.component';
import { SpinnerComponent } from '../../common/spinner/spinner.component';
import { OrderStatus } from '../../dto/enum/order-status';
import { PageState } from '../../dto/enum/page-state';
import PaymentInformationModel from '../../dto/model/payment-information-model';
import UpdatePaymentVnPayRequest from '../../dto/request/update-payment-vnpay-request';
import { PaymentService } from '../../service/payment.service';
import CurrencyUtil from '../../utils/currency-util';
import { TimeUtil } from '../../utils/time-util';
import UpdatePaymentZalopayRequest from '../../dto/request/update-payment-zalopay-request';

@Component({
  selector: 'app-payment-information',
  standalone: true,
  imports: [CommonModule, NotFoundComponent, SpinnerComponent],
  templateUrl: './payment-information.component.html',
  styleUrl: './payment-information.component.scss',
})
export class PaymentInformationComponent implements OnInit {
  paymentInformation?: PaymentInformationModel;

  pageState: PageState = PageState.Init;
  constructor(
    private paymentService: PaymentService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      var vnp_TxnRef = params['vnp_TxnRef'];
      var vnp_PayDate = params['vnp_PayDate'];
      var apptransid = params['apptransid'];
      if (vnp_TxnRef && vnp_PayDate)
        this.fetchUpdateVnPayPayment(vnp_TxnRef, vnp_PayDate);
      if (apptransid) this.fetchUpdateZaloPayment(apptransid);
    });
  }

  fetchUpdateVnPayPayment(transactionCode: string, transactionDate: string) {
    var updatePaymentRequest = new UpdatePaymentVnPayRequest(
      transactionCode,
      transactionDate
    );
    this.pageState = PageState.Loading;
    this.paymentService.updateVnPayPayment(updatePaymentRequest).subscribe({
      next: (response) => {
        this.paymentInformation = response.data;
        this.pageState = PageState.Success;
      },
      error: (response) => {
        this.pageState = PageState.Error;
      },
    });
  }

  fetchUpdateZaloPayment(transactionCode: string) {
    var updatePaymentRequest = new UpdatePaymentZalopayRequest(transactionCode);
    this.pageState = PageState.Loading;
    this.paymentService.updateZaloPayRequest(updatePaymentRequest).subscribe({
      next: (response) => {
        this.paymentInformation = response.data;
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
    switch (this.paymentInformation?.orderStatus) {
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
    switch (this.paymentInformation?.orderStatus) {
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
    return this.paymentInformation?.transactionCode ?? '';
  }

  formattedTotalAmount() {
    return this.paymentInformation
      ? CurrencyUtil.formatCurrency(this.paymentInformation.totalAmount)
      : '';
  }

  formattedCreatedAt() {
    return this.paymentInformation
      ? TimeUtil.formatShortDateTime(
          TimeUtil.convertUtcTimeToLocalTime(
            this.paymentInformation.createdAt.toString()
          )
        )
      : '';
  }
}
