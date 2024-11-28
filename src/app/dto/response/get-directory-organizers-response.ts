import { BaseApiResponse } from '../base/base-api-response';
import DirectoryOrganizerDto from '../model/directory-organizer-dto';

export default class GetDirectoryOrganizersResponse extends BaseApiResponse<
  DirectoryOrganizerDto[]
> {}
