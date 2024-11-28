import { BaseApiResponse } from '../base/base-api-response';
import EventParticipantDto from '../model/event-participant-dto';

export default class GetEventParticipantTimelineResponse extends BaseApiResponse<
  EventParticipantDto[]
> {}
