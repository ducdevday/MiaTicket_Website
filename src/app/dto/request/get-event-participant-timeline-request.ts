export default class GetEventParticipantTimelineRequest {
  startDate!: string;
  endDate!: string;
  constructor(startDate: string, endDate: string) {
    this.startDate = startDate;
    this.endDate = endDate;
  }
}
