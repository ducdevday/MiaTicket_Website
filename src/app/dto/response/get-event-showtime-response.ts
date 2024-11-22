import { BaseApiResponse } from '../base/base-api-response';
import ShowTimeDetailDto from '../model/show-time-detail-dto';

export default class GetEventShowTimeResponse extends BaseApiResponse<
  ShowTimeDetailDto[]
> {}
