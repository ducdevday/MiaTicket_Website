export abstract class BaseApiRequest {
  pageSize!: number;
  pageIndex!: number;

  constructor(pageSize: number, pageIndex: number) {
    this.pageSize = pageSize;
    this.pageIndex = pageIndex;
  }
}
