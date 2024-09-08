import { BaseApiResponse } from '../base/base-api-response';
import CategoryModel from '../model/category-model';

export default class GetCategoriesDiscoveryResponse extends BaseApiResponse<
  CategoryModel[]
> {}
