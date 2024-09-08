import { BaseApiResponse } from '../base/base-api-response';
import ProvinceModel from '../model/province-model';

export default class GetListProvinceResponse extends BaseApiResponse<
  ProvinceModel[]
> {}
