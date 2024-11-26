import { BaseApiResponse } from '../base/base-api-response';
import OrderSummaryFigureDto from '../model/order-summary-figure-dto';

export default class GetOrderSummaryFigureResponse extends BaseApiResponse<
  OrderSummaryFigureDto[]
> {}
