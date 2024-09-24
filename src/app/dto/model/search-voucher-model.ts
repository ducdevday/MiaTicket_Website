import { VoucherType } from '../enum/voucher-type';

export default class SearchVoucherModel {
  id!: number;
  name!: string;
  code!: string;
  value!: number;
  type!: VoucherType;
}
