import TicketDetailDto from './ticket-detail-dto';

export default class TicketBookingModel extends TicketDetailDto {
  quantity: number = 0;
  constructor(ticketDetailDto: TicketDetailDto) {
    super(
      ticketDetailDto.id,
      ticketDetailDto.name,
      ticketDetailDto.price,
      ticketDetailDto.isAvailable,
      ticketDetailDto.minimumPurchase,
      ticketDetailDto.maximumPurchase,
      ticketDetailDto.description
    );
  }
}
