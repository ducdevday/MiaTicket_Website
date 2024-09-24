export default class SearchVoucherRequest {
  eventId!: number;
  code!: string;
  totalTicketQuantityOfOrder!: number;

  constructor(
    eventId: number,
    code: string,
    totalTicketQuantityOfOrder: number
  ) {
    this.eventId = eventId;
    this.code = code;
    this.totalTicketQuantityOfOrder = totalTicketQuantityOfOrder;
  }
}
