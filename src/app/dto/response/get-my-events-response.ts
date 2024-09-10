import { BaseApiResponse } from '../base/base-api-response';
import MyEventModel from '../model/my-event-model';

export default class GetMyEventResponse extends BaseApiResponse<
  MyEventModel[]
> {}
