import ShowTimeDetailDto from './show-time-detail-dto';

export default class EventDetailModel {
  id!: number;
  name: string = '';
  description: string = '';
  addressName: string = '';
  addressDetail: string = '';
  backgroundUrl: string = '';
  organizerName: string = '';
  organizerInformation: string = '';
  organizerLogoUrl: string = '';
  showTimes: ShowTimeDetailDto[] = [];
}
