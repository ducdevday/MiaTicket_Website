import { OrganizerPosition } from '../enum/organizer-position';
import MemberModel from './member-model';

export default class GetEventMembersModel {
  eventName!: string;
  canAddNewMembers!: boolean;
  addAbleRoles!: OrganizerPosition[];
  members!: MemberModel[];
}
