import { OrderStatus } from '../enum/order-status';

export default class PaymentInformationModel {
  transactionCode: string = '';
  paymentUrl!: string;
  totalAmount!: number;
  createdAt!: Date;
  expireAt!: Date;
  orderStatus!: OrderStatus;
}
