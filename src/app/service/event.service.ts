import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_URL } from '../const/environment';
import CreateEventRequest from '../dto/request/create-event-request';
import CreateEventResponse from '../dto/response/create-event-response';
import GetMyEventsRequest from '../dto/request/get-my-events-request';
import GetMyEventResponse from '../dto/response/get-my-events-response';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  http!: HttpClient;
  private BASE_EVENT_URL = `${BASE_URL}/event`;
  private MY_EVENTS_URL = `my-events`;

  constructor(http: HttpClient) {
    this.http = http;
  }
  createEvent(createEventRequest: CreateEventRequest) {
    return this.http.post<CreateEventResponse>(
      this.BASE_EVENT_URL,
      createEventRequest
    );
  }
  getMyEvents(getMyEventsRequest: GetMyEventsRequest) {
    const params = new HttpParams({ fromObject: { ...getMyEventsRequest } });
    return this.http.get<GetMyEventResponse>(
      `${this.BASE_EVENT_URL}/${this.MY_EVENTS_URL}`,
      { params }
    );
  }
}
