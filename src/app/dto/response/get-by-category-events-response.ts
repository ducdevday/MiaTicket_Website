import { BaseApiResponse } from '../base/base-api-response';
import ByCategoryEventModel from '../model/by-category-event-model';

export default class GetByCategoryEventsResponse extends BaseApiResponse<
  ByCategoryEventModel[]
> {}
