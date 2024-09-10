export default class GetLatestEventsRequest {
  count!: number;
  constructor(count: number) {
    this.count = count;
  }
}
