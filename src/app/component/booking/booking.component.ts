import { Component, Input, OnInit } from '@angular/core';
import { HeaderComponent } from '../../common/header/header.component';
import { ButtonModule } from 'primeng/button';
import { EventService } from '../../service/event.service';
import { ActivatedRoute, Router } from '@angular/router';
import EventBookingModel from '../../dto/model/event-booking-model';
import { ProcessingService } from '../../service/processing.service';
import { PageState } from '../../dto/enum/page-state';
import { CommonModule, KeyValue } from '@angular/common';
import { NotFoundComponent } from '../../common/not-found/not-found.component';
import { TimeUtil } from '../../utils/time-util';
import CurrencyUtil from '../../utils/currency-util';
import OrderTicketModel from '../../dto/model/order-ticket-model';
import TicketModel from '../../dto/model/ticket-model';
import TicketDetailDto from '../../dto/model/ticket-detail-dto';
import { LocalStorageService } from '../../service/local-storage.service';
import TicketBookingModel from '../../dto/model/ticket-booking-model';
import { LOGIN_PATH, PAYMENT_PATH } from '../../app.routes';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [CommonModule, HeaderComponent, ButtonModule, NotFoundComponent],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.scss',
})
export class BookingComponent implements OnInit {
  eventId!: string;
  showTimeId!: string;

  eventBooking!: EventBookingModel;
  pageState: PageState = PageState.Init;

  currentTickets: TicketBookingModel[] = [];

  constructor(
    private eventService: EventService,
    private processingService: ProcessingService,
    private localStorageService: LocalStorageService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.eventId = this.route.snapshot.params['eventId'];
    this.showTimeId = this.route.snapshot.params['showTimeId'];
    this.fetchEventBooking();
  }
  fetchEventBooking() {
    this.processingService.show();
    this.eventService.getEventBooking(this.eventId, this.showTimeId).subscribe({
      next: (response) => {
        this.eventBooking = response.data;
        this.processingService.hide();
        this.pageState = PageState.Success;

        this.initCurrentTickets();
        this.getCartItems();
      },
      error: (err) => {
        this.processingService.hide();
        this.pageState = PageState.Error;
      },
    });
  }

  initCurrentTickets() {
    this.eventBooking.showTime.tickets.forEach((ticket) => {
      this.currentTickets.push(new TicketBookingModel(ticket));
    });
  }

  getCartItems() {
    var cartItem = this.localStorageService.getCartItem();
    if (
      cartItem.eventId !== this.eventId ||
      cartItem.showtimeId !== this.showTimeId
    ) {
      this.localStorageService.clearCartItem();
    } else {
      cartItem.tickets.forEach((kv) => {
        var ticket = this.currentTickets.find((c) => c.id == kv.key);
        if (ticket) {
          ticket.quantity = Number(kv.value);
        }
      });
    }
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

  addOrderTicket(ticket: TicketBookingModel) {
    if (ticket.quantity === ticket.maximumPurchase) return;
    if (ticket.quantity == 0) {
      ticket.quantity = ticket.minimumPurchase;
    } else {
      ticket.quantity++;
    }
  }

  removeOrderTicket(ticket: TicketBookingModel) {
    if (ticket.quantity === 0) return;
    if (ticket.quantity === ticket.minimumPurchase) {
      ticket.quantity = 0;
    } else {
      ticket.quantity--;
    }
  }

  disableAddOrderTicket(ticket: TicketBookingModel): boolean {
    if (!ticket.isAvailable) return true;
    if (ticket.quantity === ticket.maximumPurchase) return true;
    return false;
  }

  disableRemoveOrderTicket(ticket: TicketBookingModel): boolean {
    if (ticket.quantity === 0) return true;
    return false;
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

  formattedTotalPrice(): string {
    return CurrencyUtil.formatCurrency(this.totalPriceOrderTicket());
  }

  onGoToPaymentButtonPressed() {
    this.localStorageService.setCartItem(
      this.eventId,
      this.showTimeId,
      this.currentTickets.map((t) => {
        const tKeyValue: KeyValue<any, any> = {
          key: t.id,
          value: t.quantity,
        };
        return tKeyValue;
      })
    );
    var isAuth = this.localStorageService.getIsAuthenticated();
    if (isAuth) {
      this.router.navigate([PAYMENT_PATH]);
    } else {
      this.router.navigate([LOGIN_PATH], {
        queryParams: { redirectUrl: PAYMENT_PATH },
      });
    }
  }

  isGoToPaymentDisabled(): boolean {
    return !this.currentTickets.some((t) => t.quantity !== 0);
  }
}
