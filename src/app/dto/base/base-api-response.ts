export abstract class BaseApiResponse<T> {
  statusCode!: number;
  message!: string;
  data!: T;
  totalRecords: number = 0;

  constructor(
    statusCode: number,
    message: string,
    data: T,
    totalRecords: number
  ) {
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
    this.totalRecords = totalRecords;
  }
}
