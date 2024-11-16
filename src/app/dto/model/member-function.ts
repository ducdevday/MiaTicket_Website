export default class MemberFunction {
  name!: string;
  canOwnerDo!: boolean;
  canModeratorDo!: boolean;
  canCoordinatorDo!: boolean;
  constructor(
    functionName: string,
    canOwnerDo: boolean,
    canModeratorDo: boolean,
    canCoordinatorDo: boolean
  ) {
    this.name = functionName;
    this.canOwnerDo = canOwnerDo;
    this.canModeratorDo = canModeratorDo;
    this.canCoordinatorDo = canCoordinatorDo;
  }
}
