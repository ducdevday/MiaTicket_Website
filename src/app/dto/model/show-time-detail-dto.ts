import TicketDetailDto from './ticket-detail-dto';

export default class ShowTimeDetailDto {
  id!: number;
  showStartAt!: Date;
  showEndAt!: Date;
  saleStartAt!: Date;
  saleEndAt!: Date;
  tickets: TicketDetailDto[] = [];
}
