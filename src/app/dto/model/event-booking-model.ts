import ShowTimeDetailDto from './show-time-detail-dto';

export default class EventBookingModel {
  id!: number;
  name!: string;
  description!: string;
  addressName!: string;
  addressDetail!: string;
  backgroundUrl!: string;
  showTime!: ShowTimeDetailDto;
}
