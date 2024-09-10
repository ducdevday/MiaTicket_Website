import { BaseApiResponse } from '../base/base-api-response';
import TrendingEventModel from '../model/trending-event-model';

export default class GetTrendingEventsResponse extends BaseApiResponse<
  TrendingEventModel[]
> {}
