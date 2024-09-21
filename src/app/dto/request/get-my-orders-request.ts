import { BaseApiRequest } from '../base/base-api-request';
import { OrderStatus } from '../enum/order-status';

export default class GetMyOrdersRequest extends BaseApiRequest {
  keyword: string = '';
  orderStatus!: OrderStatus;

  constructor(
    keyword: string,
    orderStatus: OrderStatus,
    page: number,
    size: number
  ) {
    super(page, size);
    this.keyword = keyword;
    this.orderStatus = orderStatus;
  }
}
