import { OrganizerPosition } from '../enum/organizer-position';

export default class MemberModel {
  memberId!: string;
  memberName!: string;
  memberEmail!: string;
  role!: OrganizerPosition;
  isAbleToEdit!: boolean;
  isAbleToDelete!: boolean;
}
