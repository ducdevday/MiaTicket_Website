import PaginationModel from '../model/pagination-model';

export default class BasePagedResponse<T> {
  items: T[] = [];
  pagination!: PaginationModel;
  constructor(items: T[], pagination: PaginationModel) {
    this.items = items;
    this.pagination = pagination;
  }
}
