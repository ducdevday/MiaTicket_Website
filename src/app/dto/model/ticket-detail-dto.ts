export default class TicketDetailDto {
  id!: number;
  name: string = '';
  price!: number;
  isAvailable!: boolean;
  minimumPurchase!: number;
  maximumPurchase!: number;
  description!: string;
}
