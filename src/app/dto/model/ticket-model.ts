export default class TicketModel {
  name!: string;
  price!: number;
  quantity!: number;
  minimumPurchase!: number;
  maximumPurchase!: number;
  description: string = '';

  constructor(
    name: string,
    price: number,
    quantity: number,
    minimumPurchase: number,
    maximumPurchase: number,
    description: string
  ) {
    this.name = name;
    this.price = price;
    this.quantity = quantity;
    this.minimumPurchase = minimumPurchase;
    this.maximumPurchase = maximumPurchase;
    this.description = description;
  }
}
