export default class GetOrderSummaryFiguresRequest {
  showTimeId!: number;
  startDate!: string;
  endDate!: string;
  constructor(showTimeId: number, startDate: string, endDate: string) {
    this.showTimeId = showTimeId;
    this.startDate = startDate;
    this.endDate = endDate;
  }
}
