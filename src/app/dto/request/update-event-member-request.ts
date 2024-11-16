import { OrganizerPosition } from '../enum/organizer-position';

export default class UpdateEventMemberRequest {
  role!: OrganizerPosition;
  constructor(role: OrganizerPosition) {
    this.role = role;
  }
}
