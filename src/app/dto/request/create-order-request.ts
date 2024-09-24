import { PaymentType } from '../enum/payment-type';
import OrderTicketModel from '../model/order-ticket-model';

export default class CreateOrderRequest {
  eventId!: number;
  receiverName!: string;
  receiverEmail!: string;
  receiverPhoneNumber!: string;
  showTimeId!: number;
  paymentType!: PaymentType;
  orderTickets!: OrderTicketModel[];
  voucherId?: number;

  constructor(
    eventId: number,
    receiverName: string,
    receiverEmail: string,
    receiverPhoneNumber: string,
    showTimeId: number,
    paymentType: PaymentType,
    orderTickets: OrderTicketModel[],
    voucherId?: number
  ) {
    this.eventId = eventId;
    this.receiverName = receiverName;
    this.receiverEmail = receiverEmail;
    this.receiverPhoneNumber = receiverPhoneNumber;
    this.showTimeId = showTimeId;
    this.voucherId = voucherId;
    this.paymentType = paymentType;
    this.orderTickets = orderTickets;
    this.voucherId = voucherId;
  }
}
