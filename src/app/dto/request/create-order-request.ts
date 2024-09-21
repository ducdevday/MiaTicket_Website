import { PaymentType } from '../enum/payment-type';
import OrderTicketModel from '../model/order-ticket-model';

export default class CreateOrderRequest {
  eventId!: number;
  receiverName!: string;
  receiverEmail!: string;
  receiverPhoneNumber!: string;
  showTimeId!: number;
  voucherCode: string = '';
  paymentType!: PaymentType;
  orderTickets!: OrderTicketModel[];

  constructor(
    eventId: number,
    receiverName: string,
    receiverEmail: string,
    receiverPhoneNumber: string,
    showTimeId: number,
    voucherCode: string,
    paymentType: PaymentType,
    orderTickets: OrderTicketModel[]
  ) {
    this.eventId = eventId;
    this.receiverName = receiverName;
    this.receiverEmail = receiverEmail;
    this.receiverPhoneNumber = receiverPhoneNumber;
    this.showTimeId = showTimeId;
    this.voucherCode = voucherCode;
    this.paymentType = paymentType;
    this.orderTickets = orderTickets;
  }
}