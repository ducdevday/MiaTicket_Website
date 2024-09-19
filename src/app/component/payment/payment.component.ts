import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { forkJoin, map } from 'rxjs';
import { BOOKING_PATH, PAYMENT_INFORMATION_PATH } from '../../app.routes';
import { NotFoundComponent } from '../../common/not-found/not-found.component';
import { EMAIL_PATTERN, PHONE_NUMBER_PATTERN } from '../../const/regex';
import { PageState } from '../../dto/enum/page-state';
import { PaymentType } from '../../dto/enum/payment-type';
import EventBookingModel from '../../dto/model/event-booking-model';
import OrderTicketModel from '../../dto/model/order-ticket-model';
import TicketBookingModel from '../../dto/model/ticket-booking-model';
import { UserModel } from '../../dto/model/user-model';
import CreateOrderRequest from '../../dto/request/create-order-request';
import { AccountService } from '../../service/account.service';
import { EventService } from '../../service/event.service';
import { LocalStorageService } from '../../service/local-storage.service';
import { OrderService } from '../../service/order.service';
import { ToastService } from '../../service/toast.service';
import CurrencyUtil from '../../utils/currency-util';
import { TimeUtil } from '../../utils/time-util';
import { ProcessingService } from '../../service/processing.service';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    InputNumberModule,
    CommonModule,
    NotFoundComponent,
    DialogModule,
    ButtonModule,
  ],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss',
})
export class PaymentComponent implements OnInit {
  pageState: PageState = PageState.Init;

  eventId!: string;
  showTimeId!: string;
  ticketIds: number[] = [];

  accountInformation!: UserModel;
  eventBooking!: EventBookingModel;

  currentTickets: TicketBookingModel[] = [];
  isShowEditReceiverInformation: boolean = false;
  receiverInformationEditForm!: FormGroup;
  paymentMethods = [
    {
      name: 'VN Pay',
      value: PaymentType.VnPay,
      img: '/ic_vnpay.png',
    },
    {
      name: 'Zalo Pay',
      value: PaymentType.ZaloPay,
      img: '/ic_zalopay.png',
    },
  ];
  currentPayment: PaymentType = PaymentType.VnPay;

  constructor(
    private fb: FormBuilder,
    private localStorageService: LocalStorageService,
    private toastService: ToastService,
    private eventService: EventService,
    private accountService: AccountService,
    private orderService: OrderService,
    private processService: ProcessingService,
    private router: Router
  ) {
    this.receiverInformationEditForm = this.fb.group({
      name: ['', [Validators.required, Validators.max(255)]],
      email: ['', [Validators.required, Validators.pattern(EMAIL_PATTERN)]],
      phoneNumber: [
        '',
        [Validators.required, Validators.pattern(PHONE_NUMBER_PATTERN)],
      ],
    });
  }

  ngOnInit(): void {
    this.getCartItems();
    var isAuth = this.localStorageService.getIsAuthenticated();
    if (this.pageState == PageState.Init && isAuth) {
      forkJoin({
        accountInformation: this.fetchAccountInformation(),
        eventBooking: this.fetchEventBooking(),
      }).subscribe({
        next: ({ accountInformation, eventBooking }) => {
          this.accountInformation = accountInformation;
          this.eventBooking = eventBooking;
          this.initCurrentTickets();
          this.pageState = PageState.Success;
        },
        error: (err) => {
          this.pageState = PageState.Error;
        },
      });
      this.fetchAccountInformation();
      this.fetchEventBooking();
    }
  }
  getCartItems() {
    var cartItem = this.localStorageService.getCartItem();
    if (
      cartItem.eventId == null ||
      cartItem.showtimeId == null ||
      cartItem.tickets.length == 0
    ) {
      this.pageState = PageState.Error;
      return;
    } else {
      this.eventId = cartItem.eventId;
      this.showTimeId = cartItem.showtimeId;
      this.ticketIds = cartItem.tickets.map((kv) => kv.key);
    }
  }

  fetchAccountInformation() {
    return this.accountService
      .getAccountInformation()
      .pipe(map((response) => response.data));
  }

  fetchEventBooking() {
    return this.eventService
      .getEventBooking(this.eventId, this.showTimeId, this.ticketIds)
      .pipe(map((response) => response.data));
  }

  initCurrentTickets() {
    var cartItem = this.localStorageService.getCartItem();
    this.eventBooking.showTime.tickets.forEach((ticket) => {
      this.currentTickets.push(new TicketBookingModel(ticket));
    });
    cartItem.tickets.forEach((kv) => {
      var ticket = this.currentTickets.find((c) => c.id == kv.key);
      if (ticket) {
        ticket.quantity = Number(kv.value);
      }
    });
  }

  isPageSuccess(): boolean {
    return this.pageState == PageState.Success;
  }

  isPageError(): boolean {
    return this.pageState == PageState.Error;
  }

  formatPrice(price: number) {
    return CurrencyUtil.formatCurrency(price);
  }

  formatDateRage(date1: Date, date2: Date) {
    return TimeUtil.formatDateTimeRange(
      TimeUtil.convertUtcTimeToLocalTime(date1.toString()),
      TimeUtil.convertUtcTimeToLocalTime(date2.toString())
    );
  }

  totalNumberOrderTicket() {
    return this.currentTickets.reduce((total, ticket) => {
      return total + ticket.quantity;
    }, 0);
  }

  totalPriceOrderTicket(): number {
    return this.currentTickets.reduce((total, ticket) => {
      const ticketPrice = ticket.price || 0;
      const ticketQuantity = ticket.quantity || 0;
      return total + ticketPrice * ticketQuantity;
    }, 0);
  }

  totalPriceOrder(): number {
    return this.totalPriceOrderTicket();
  }

  onUpdateReceiverInformation() {
    console.log(this.receiverInformationEditForm.controls['name'].valid);
    console.log(this.receiverInformationEditForm.controls['email'].valid);
    console.log(this.receiverInformationEditForm.controls['phoneNumber'].valid);

    if (this.receiverInformationEditForm.valid) {
      const { name, email, phoneNumber } =
        this.receiverInformationEditForm.value;
      this.accountInformation.name = name;
      this.accountInformation.email = email;
      this.accountInformation.phoneNumber = phoneNumber;
      this.isShowEditReceiverInformation = false;
    } else {
      this.toastService.showError('Invalid Input Field');
    }
  }

  onUpdateTicketSelected() {
    this.router.navigate([
      BOOKING_PATH.replace(':eventId', this.eventId).replace(
        ':showTimeId',
        this.showTimeId
      ),
    ]);
  }

  allowNumbersOnly(event: KeyboardEvent) {
    const charCode = event.charCode;
    if (charCode >= 48 && charCode <= 57) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  }

  onPaymentButtonPressed() {
    var orderTickets = this.currentTickets.map(
      (t) => new OrderTicketModel(t.id, t.quantity)
    );
    var createOrderRequest = new CreateOrderRequest(
      Number(this.eventId),
      this.accountInformation.name,
      this.accountInformation.email,
      this.accountInformation.phoneNumber,
      Number(this.showTimeId),
      '',
      this.currentPayment,
      orderTickets
    );
    this.processService.show();
    this.orderService.createOrder(createOrderRequest).subscribe({
      next: (response) => {
        this.toastService.showSuccess('Create Order Success');
        this.localStorageService.clearCartItem();
        this.processService.hide();
        window.open(response.data, '_self');
      },
      error: (err) => {
        this.processService.hide();
        this.toastService.showError('Create Order Failure');
      },
    });
  }
}
