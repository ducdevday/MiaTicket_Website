import { BaseApiResponse } from '../base/base-api-response';
import EventCategoryFigureDto from '../model/event-category-figure-dto';

export default class GetSummaryEventCategoriesResponse extends BaseApiResponse<
  EventCategoryFigureDto[]
> {}
