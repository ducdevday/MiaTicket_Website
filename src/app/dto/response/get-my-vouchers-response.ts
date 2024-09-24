import { BaseApiResponse } from '../base/base-api-response';
import VoucherModel from '../model/voucher-model';

export default class GetMyVouchersResponse extends BaseApiResponse<
  VoucherModel[]
> {
  eventName!: string;
}
