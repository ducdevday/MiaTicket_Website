import { BaseApiResponse } from '../base/base-api-response';
import SearchEventModel from '../model/search-event-model';

export default class SearchEventsResponse extends BaseApiResponse<
  SearchEventModel[]
> {}
