import { BaseApiResponse } from '../base/base-api-response';
import GetCheckInEventReportModel from '../model/get-check-in-event-report-model';
import TicketCheckInModel from '../model/ticket-checkin-model';

export default class GetCheckInEventReportResponse extends BaseApiResponse<GetCheckInEventReportModel> {
  ticketCheckedInPercentage!: number;
  totalCheckedInTickets!: number;
  totalPaidTickets!: number;
  tickets: TicketCheckInModel[] = [];
}
