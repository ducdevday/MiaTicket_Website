import { VoucherType } from '../enum/voucher-type';

export default class VoucherModel {
  id!: number;
  name!: string;
  code!: string;
  startDate!: Date;
  endDate!: Date;
  eventId!: number;
  value!: number;
  type!: VoucherType;
  initQuantity!: number;
  appliedQuantity!: number;
  quantity?: number;
  minQuantityPerOrder?: number;
  maxQuantityPerOrder?: number;
}
