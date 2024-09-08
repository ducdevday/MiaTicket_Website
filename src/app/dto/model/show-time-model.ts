import TicketModel from './ticket-model';

export default class ShowTimeModel {
  showStartAt!: Date;
  showEndAt!: Date;
  saleStartAt!: Date;
  saleEndAt!: Date;
  tickets: TicketModel[] = [];

  constructor(
    showStartAt: Date,
    showEndAt: Date,
    saleStartAt: Date,
    saleEndAt: Date,
    tickets: TicketModel[]
  ) {
    this.showStartAt = showStartAt;
    this.showEndAt = showEndAt;
    this.saleStartAt = saleStartAt;
    this.saleEndAt = saleEndAt;
    this.tickets = tickets;
  }
}
