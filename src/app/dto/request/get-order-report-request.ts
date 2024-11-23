import { BaseApiRequest } from '../base/base-api-request';

export default class GetOrderReportRequest extends BaseApiRequest {
  showTimeId!: number;
  constructor(showTimeId: number, page: number, size: number) {
    super(page, size);
    this.showTimeId = showTimeId;
  }
}
