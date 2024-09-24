import { BaseApiResponse } from '../base/base-api-response';
import VoucherDiscoveryModel from '../model/voucher-discovery-model';

export default class GetVouchersDiscoveryResponse extends BaseApiResponse<
  VoucherDiscoveryModel[]
> {}
