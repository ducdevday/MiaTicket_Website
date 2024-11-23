import { BaseApiResponse } from '../base/base-api-response';
import OrderReportDto from '../model/order-report-dto';

export default class GetOrderReportResponse extends BaseApiResponse<
  OrderReportDto[]
> {
  totalRecords: number = 0;
}
