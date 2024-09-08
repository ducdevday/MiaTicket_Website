import { BaseApiRequest } from '../base/base-api-request';

export default class GetMyEventsRequest extends BaseApiRequest {
  keyword: string = '';
  eventStatus!: number;
  constructor(
    keyword: string,
    eventStatus: number,
    page: number,
    size: number
  ) {
    super(page, size);
    this.keyword = keyword;
    this.eventStatus = eventStatus;
  }
}
