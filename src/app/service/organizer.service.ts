import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import GetEventMembersRequest from '../dto/request/get-event-members-request';
import { BASE_URL } from '../const/environment';
import GetEventMembersResponse from '../dto/response/get-event-members-response';
import AddEventMemberRequest from '../dto/request/add-event-member-request';
import AddEventMemberResponse from '../dto/response/add-event-member-response';
import UpdateEventMemberRequest from '../dto/request/update-event-member-request';
import UpdateEventMemberResponse from '../dto/response/update-event-member-response';
import DeleteEventMemberResponse from '../dto/response/delete-event-member-response';

@Injectable({
  providedIn: 'root',
})
export class OrganizerService {
  http!: HttpClient;
  private BASE_ORGANIZER_URL = `${BASE_URL}/organizer`;

  constructor(http: HttpClient) {
    this.http = http;
  }

  getEventMembers(
    eventId: number,
    getEventMembersRequest: GetEventMembersRequest
  ) {
    const params = new HttpParams({
      fromObject: { ...getEventMembersRequest },
    });

    return this.http.get<GetEventMembersResponse>(
      `${this.BASE_ORGANIZER_URL}/events/${eventId}/members`,
      {
        params,
      }
    );
  }

  addEventMember(
    eventId: number,
    addEventMemberRequest: AddEventMemberRequest
  ) {
    return this.http.post<AddEventMemberResponse>(
      `${this.BASE_ORGANIZER_URL}/events/${eventId}/members`,
      addEventMemberRequest
    );
  }

  updateEventMember(
    eventId: number,
    memberId: string,
    updateEventMemberRequest: UpdateEventMemberRequest
  ) {
    return this.http.patch<UpdateEventMemberResponse>(
      `${this.BASE_ORGANIZER_URL}/events/${eventId}/members/${memberId}`,
      updateEventMemberRequest
    );
  }

  deleteEventMember(eventId: number, memberId: string) {
    return this.http.delete<DeleteEventMemberResponse>(
      `${this.BASE_ORGANIZER_URL}/events/${eventId}/members/${memberId}`
    );
  }
}
