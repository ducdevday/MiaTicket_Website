import { BaseApiResponse } from '../base/base-api-response';
import DistrictModel from '../model/district-model';

export default class GetListDistrictResponse extends BaseApiResponse<
  DistrictModel[]
> {}
