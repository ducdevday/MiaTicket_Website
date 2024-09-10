export default class BannerModel {
  eventId: number;
  name: string;
  slug: string;
  imageUrl: string;
  videoUrl: string;
  price: number;
  startDate: Date;
  constructor(
    eventId: number,
    name: string,
    slug: string,
    imageUrl: string,
    videoUrl: string,
    price: number,
    startDate: Date
  ) {
    this.eventId = eventId;
    this.name = name;
    this.slug = slug;
    this.imageUrl = imageUrl;
    this.videoUrl = videoUrl;
    this.price = price;
    this.startDate = startDate;
  }
}
