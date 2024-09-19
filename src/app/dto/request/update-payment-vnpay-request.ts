export default class UpdatePaymentVnPayRequest {
  transactionCode!: string;
  transactionDate!: string;

  constructor(transactionCode: string, transactionDate: string) {
    this.transactionCode = transactionCode;
    this.transactionDate = transactionDate;
  }
}
