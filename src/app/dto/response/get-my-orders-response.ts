import { BaseApiResponse } from '../base/base-api-response';
import MyOrderModel from '../model/my-order-model';

export default class GetMyOrdersResponse extends BaseApiResponse<
  MyOrderModel[]
> {
  totalRecords: number = 0;
}
