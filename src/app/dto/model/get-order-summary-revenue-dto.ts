import TicketSummaryRevenueDto from './ticket-summary-revenue-dto';

export default class GetOrderSummaryRevenueDto {
  ticketSoldPercentage!: number;
  totalSoldTickets!: number;
  totalCapacityTickets!: number;
  grossSalePercentage!: number;
  totalCurrentGrossSale!: number;
  totalCapacityGrossSale!: number;
  tickets!: TicketSummaryRevenueDto[];
}
