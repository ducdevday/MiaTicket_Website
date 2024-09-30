export default class UpdatePaymentZalopayRequest {
  transactionCode!: string;
  constructor(transactionCode: string) {
    this.transactionCode = transactionCode;
  }
}
