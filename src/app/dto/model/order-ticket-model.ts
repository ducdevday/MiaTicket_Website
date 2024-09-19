export default class OrderTicketModel {
  ticketId!: number;
  quantity!: number;
  constructor(ticketId: number, quantity: number) {
    this.ticketId = ticketId;
    this.quantity = quantity;
  }
}
