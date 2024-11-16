import { BaseApiResponse } from '../base/base-api-response';
import GetEventMembersModel from '../model/get-event-members-model';

export default class GetEventMembersResponse extends BaseApiResponse<GetEventMembersModel> {
  totalRecords: number = 0;
}
