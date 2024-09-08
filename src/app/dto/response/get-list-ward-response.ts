import { BaseApiResponse } from '../base/base-api-response';
import WardModel from '../model/ward-model';

export default class GetListWardDataResponse extends BaseApiResponse<
  WardModel[]
> {}
