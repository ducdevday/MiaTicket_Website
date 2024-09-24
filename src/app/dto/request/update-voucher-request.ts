import { VoucherType } from '../enum/voucher-type';

export default class UpdateVoucherRequest {
  name!: string;
  code!: string;
  startDate!: Date;
  endDate!: Date;
  eventId!: number;
  value!: number;
  type!: VoucherType;
  quantity?: number;
  minQuantityPerOrder?: number;
  maxQuantityPerOrder?: number;
  constructor(
    name: string,
    code: string,
    startDate: Date,
    endDate: Date,
    eventId: number,
    value: number,
    type: VoucherType,
    quantity?: number,
    minQuantityPerOrder?: number,
    maxQuantityPerOrder?: number
  ) {
    this.name = name;
    this.code = code;
    this.startDate = startDate;
    this.endDate = endDate;
    this.eventId = eventId;
    this.value = value;
    this.type = type;
    this.quantity = quantity;
    this.minQuantityPerOrder = minQuantityPerOrder;
    this.maxQuantityPerOrder = maxQuantityPerOrder;
  }
}
