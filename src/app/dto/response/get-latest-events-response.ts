import { BaseApiResponse } from '../base/base-api-response';
import LatestEventModel from '../model/latest-event-model';

export default class GetLatestEventsResponse extends BaseApiResponse<
  LatestEventModel[]
> {}
