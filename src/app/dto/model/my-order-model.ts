import OrderTicketDetailModel from './order-ticket-detail-model';

export default class MyOrderModel {
  id!: number;
  image!: string;
  eventName!: string;
  showTimeStart!: Date;
  showTimeEnd!: Date;
  addressName!: string;
  addressDetail!: string;
  orderTickets!: OrderTicketDetailModel[];
  totalPrice!: number;
  isCanCancel!: boolean;
  isCanRepayment!: boolean;
  paymentUrl!: string;
}
