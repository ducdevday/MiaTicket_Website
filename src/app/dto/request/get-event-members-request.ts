import { BaseApiRequest } from '../base/base-api-request';

export default class GetEventMembersRequest extends BaseApiRequest {
  keyword: string = '';
  constructor(keyword: string, page: number, size: number) {
    super(page, size);
    this.keyword = keyword;
  }
}
