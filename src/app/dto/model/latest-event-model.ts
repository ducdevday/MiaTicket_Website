export default class LatestEventModel {
  id: number;
  slug: string;
  imageUrl: string;

  constructor(id: number, slug: string, imageUrl: string) {
    this.id = id;
    this.slug = slug;
    this.imageUrl = imageUrl;
  }
}
