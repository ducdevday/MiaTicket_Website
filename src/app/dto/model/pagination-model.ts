export default class PaginationModel {
  currentPageIndex!: number;
  currentPageSize!: number;
  totalRecords!: number;
  totalPages!: number;

  constructor(
    currentPageIndex: number,
    currentPageSize: number,
    totalRecords: number,
    totalPages: number
  ) {
    this.currentPageIndex = currentPageIndex;
    this.currentPageSize = currentPageSize;
    this.totalRecords = totalRecords;
    this.totalPages = totalPages;
  }
}
