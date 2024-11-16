import { OrganizerPosition } from '../enum/organizer-position';

export default class AddEventMemberRequest {
  memberEmail!: string;
  memberRole!: OrganizerPosition;
  constructor(memberEmail: string, memberRole: OrganizerPosition) {
    this.memberEmail = memberEmail;
    this.memberRole = memberRole;
  }
}
