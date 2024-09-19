export default class TicketDetailDto {
  id!: number;
  name: string = '';
  price!: number;
  isAvailable!: boolean;
  minimumPurchase!: number;
  maximumPurchase!: number;
  description!: string;
  constructor(
    id: number,
    name: string,
    price: number,
    isAvailable: boolean,
    minimumPurchase: number,
    maximumPurchase: number,
    description: string
  ) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.isAvailable = isAvailable;
    this.minimumPurchase = minimumPurchase;
    this.maximumPurchase = maximumPurchase;
    this.description = description;
  }
}
