import { VoucherType } from '../enum/voucher-type';

export default class VoucherDiscoveryModel {
  id!: number;
  name!: string;
  code!: string;
  value!: number;
  type!: VoucherType;
  isAvailable!: boolean;
}
