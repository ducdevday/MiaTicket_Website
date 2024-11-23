import { PaymentStatus } from '../enum/payment-status';
import { PaymentType } from '../enum/payment-type';
import TicketReportDto from './ticket-report-dto';

export default class OrderReportDto {
  receiverName!: string;
  receiverEmail!: string;
  receiverPhoneNumber!: string;
  paymentMethod!: PaymentType;
  tickets!: TicketReportDto[];
  totalPrice!: number;
  paymentStatus!: PaymentStatus;
}
