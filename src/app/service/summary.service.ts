import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_URL } from '../const/environment';
import GetSummaryEventCategoriesResponse from '../dto/response/get-summary-event-categories-response';
import GetDirectoryOrganizersResponse from '../dto/response/get-directory-organizers-response';
import GetEventParticipantTimelineResponse from '../dto/response/get-event-participant-timeline-response';
import GetEventParticipantTimelineRequest from '../dto/request/get-event-participant-timeline-request';

@Injectable({
  providedIn: 'root',
})
export class SummaryService {
  http!: HttpClient;
  private BASE_SUMMARY_URL = `${BASE_URL}/summary`;
  private EVENT_CATEGORIES_URL = `event-categories`;
  private DIRECTORY_ORGANIZERS_URL = `directory-organizers`;
  private EVENT_PARTICIPATION_TIMELINE_URL = `event-participation-timeline`;
  constructor(http: HttpClient) {
    this.http = http;
  }

  getSummaryEventCategories() {
    return this.http.get<GetSummaryEventCategoriesResponse>(
      `${this.BASE_SUMMARY_URL}/${this.EVENT_CATEGORIES_URL}`
    );
  }

  getDirectoryOrganizers() {
    return this.http.get<GetDirectoryOrganizersResponse>(
      `${this.BASE_SUMMARY_URL}/${this.DIRECTORY_ORGANIZERS_URL}`
    );
  }

  getEventParticipantTimeline(request: GetEventParticipantTimelineRequest) {
    const params = new HttpParams({ fromObject: { ...request } });
    return this.http.get<GetEventParticipantTimelineResponse>(
      `${this.BASE_SUMMARY_URL}/${this.EVENT_PARTICIPATION_TIMELINE_URL}`,
      { params }
    );
  }
}
