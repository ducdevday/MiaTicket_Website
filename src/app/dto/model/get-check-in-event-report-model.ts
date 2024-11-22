import TicketCheckInModel from './ticket-checkin-model';

export default class GetCheckInEventReportModel {
  ticketCheckedInPercentage!: number;
  totalCheckedInTickets!: number;
  totalPaidTickets!: number;
  tickets: TicketCheckInModel[] = [];
}
