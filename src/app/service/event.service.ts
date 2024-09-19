import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_URL } from '../const/environment';
import CreateEventRequest from '../dto/request/create-event-request';
import CreateEventResponse from '../dto/response/create-event-response';
import GetMyEventsRequest from '../dto/request/get-my-events-request';
import GetMyEventResponse from '../dto/response/get-my-events-response';
import GetLatestEventsRequest from '../dto/request/get-latest-events-request';
import GetTrendingEventsRequest from '../dto/request/get-trending-events-request';
import GetLatestEventsResponse from '../dto/response/get-latest-events-response';
import GetTrendingEventsResponse from '../dto/response/get-trending-events-response';
import GetByCategoryEventsRequest from '../dto/request/get-by-category-events-request';
import GetByCategoryEventsResponse from '../dto/response/get-by-category-events-response';
import SearchEventRequest from '../dto/request/search-event-request';
import SearchEventsResponse from '../dto/response/search-events-response';
import GetEventDetailResponse from '../dto/response/get-event-detail-response';
import GetEventBookingResponse from '../dto/response/get-event-booking-response';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  http!: HttpClient;
  private BASE_EVENT_URL = `${BASE_URL}/event`;
  private MY_EVENTS_URL = `my-events`;
  private LATEST_EVENTS_URL = `latest`;
  private TRENDING_EVENTS_URL = `trending`;
  private BY_CATEGORY_EVENTS_URL = `by-category`;
  private SEARCH_EVENT_URL = `search`;
  private EVENT_DETAIL_URL = `detail`;
  private SHOWTIME_URL = `showtime`;

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
  getGetLatestEvents(getGetLatestEventsRequest: GetLatestEventsRequest) {
    const params = new HttpParams({
      fromObject: { ...getGetLatestEventsRequest },
    });
    return this.http.get<GetLatestEventsResponse>(
      `${this.BASE_EVENT_URL}/${this.LATEST_EVENTS_URL}`,
      { params }
    );
  }
  getTrendingEvents(getTrendingEventsRequest: GetTrendingEventsRequest) {
    const params = new HttpParams({
      fromObject: { ...getTrendingEventsRequest },
    });
    return this.http.get<GetTrendingEventsResponse>(
      `${this.BASE_EVENT_URL}/${this.TRENDING_EVENTS_URL}`,
      { params }
    );
  }
  getByCategoryEvents(getByCategoryEventRequest: GetByCategoryEventsRequest) {
    const params = new HttpParams({
      fromObject: { ...getByCategoryEventRequest },
    });
    return this.http.get<GetByCategoryEventsResponse>(
      `${this.BASE_EVENT_URL}/${this.BY_CATEGORY_EVENTS_URL}`,
      { params }
    );
  }
  searchEvent(searchEventRequest: SearchEventRequest) {
    let params = new HttpParams();
    for (const [key, value] of Object.entries(searchEventRequest)) {
      if (value !== undefined && value !== null) {
        params = params.set(key, value.toString());
      }
    }

    return this.http.get<SearchEventsResponse>(
      `${this.BASE_EVENT_URL}/${this.SEARCH_EVENT_URL}`,
      { params }
    );
  }
  getEventDetail(eventId: string) {
    return this.http.get<GetEventDetailResponse>(
      `${this.BASE_EVENT_URL}/${this.EVENT_DETAIL_URL}/${eventId}`
    );
  }
  getEventBooking(eventId: string, showTimeId: string, ticketIds?: number[]) {
    let params = new HttpParams();

    if (ticketIds && ticketIds.length > 0) {
      ticketIds.forEach((id) => {
        params = params.append('ticketIds', id.toString());
      });
    }

    return this.http.get<GetEventBookingResponse>(
      `${this.BASE_EVENT_URL}/${this.EVENT_DETAIL_URL}/${eventId}/${this.SHOWTIME_URL}/${showTimeId}`,
      { params }
    );
  }
}
