import { BaseApiResponse } from '../base/base-api-response';
import BannerModel from '../model/banner-model';

export default class GetBannersDiscoveryResponse extends BaseApiResponse<
  BannerModel[]
> {}
