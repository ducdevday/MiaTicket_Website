import { BaseApiRequest } from '../base/base-api-request';
import { EventSortType } from '../enum/event-sort-type';

export default class SearchEventRequest extends BaseApiRequest {
  keyword?: string;
  location?: string;
  categories?: string;
  priceRange?: string;
  sortBy?: number;

  constructor(
    page: number,
    size: number,
    keyword?: string,
    location?: string,
    categories?: string,
    priceRange?: string,
    sortBy?: EventSortType
  ) {
    super(page, size);
    this.keyword = keyword;
    this.location = location;
    this.categories = categories;
    this.priceRange = priceRange;
    this.sortBy = sortBy;
  }
}
