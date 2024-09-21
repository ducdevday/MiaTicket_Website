import { OrderStatus } from '../enum/order-status';
import { PaymentType } from '../enum/payment-type';
import OrderTicketDetailModel from './order-ticket-detail-model';

export default class OrderDetailModel {
  id!: number;
  image!: string;
  eventName!: string;
  showTimeStart!: Date;
  showTimeEnd!: Date;
  createdAt!: Date;
  addressName!: string;
  addressDetail!: string;
  discount!: number;
  orderTickets!: OrderTicketDetailModel[];
  totalPrice!: number;
  isCanCancel!: boolean;
  isCanRepayment!: boolean;
  paymentUrl!: string;
  isUsed!: boolean;
  paymentType!: PaymentType;
  orderStatus!: OrderStatus;
  qrCode?: string;
  receiverName?: string;
  receiverEmail?: string;
  receiverPhoneNumber?: string;
}
