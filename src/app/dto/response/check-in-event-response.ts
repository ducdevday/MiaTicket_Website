import { BaseApiResponse } from '../base/base-api-response';
import OrderTicketDetailModel from '../model/order-ticket-detail-model';

export default class CheckInEventResponse extends BaseApiResponse<
  OrderTicketDetailModel[]
> {}
