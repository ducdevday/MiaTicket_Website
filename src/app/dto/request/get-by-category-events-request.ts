export default class GetByCategoryEventsRequest {
  categoryId!: number;
  count!: number;

  constructor(categoryId: number, count: number) {
    this.categoryId = categoryId;
    this.count = count;
  }
}
