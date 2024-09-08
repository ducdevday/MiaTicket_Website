import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_URL } from '../const/environment';
import CreateEventRequest from '../dto/request/create-event-request';
import CreateEventResponse from '../dto/response/create-event-response';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  http!: HttpClient;
  private BASE_EVENT_URL = `${BASE_URL}/event`;

  constructor(http: HttpClient) {
    this.http = http;
  }
  createEvent(createEventRequest: CreateEventRequest) {
    return this.http.post<CreateEventResponse>(
      this.BASE_EVENT_URL,
      createEventRequest
    );
  }
}
