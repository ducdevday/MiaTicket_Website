export default class PaginationModel {
  currentPage!: number;
  currentSize!: number;
  totalRecords!: number;
  totalPages!: number;

  constructor(
    currentPage: number,
    currentSize: number,
    totalRecords: number,
    totalPages: number
  ) {
    this.currentPage = currentPage;
    this.currentSize = currentSize;
    this.totalRecords = totalRecords;
    this.totalPages = totalPages;
  }
}
