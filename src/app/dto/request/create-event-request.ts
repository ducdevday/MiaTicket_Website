import ShowTimeModel from '../model/show-time-model';

export default class CreateEventRequest extends FormData {
  constructor(
    name: string,
    logoFile: File,
    backgroundFile: File,
    isOffline: boolean,
    addressName: string,
    addressProvince: string,
    addressDistrict: string,
    addressWard: string,
    addressNo: string,
    description: string,
    organizerName: string,
    organizerInformation: string,
    organizerLogoFile: string,
    paymentAccount: string,
    paymentNumber: string,
    paymentBankName: string,
    paymentBankBranch: string,
    categoryId: number,
    userId: string,
    showTimes: ShowTimeModel[]
  ) {
    super();
    this.appendData('Name', name);
    this.appendData('IsOffline', isOffline);
    this.appendData('Description', description);
    this.appendData('AddressName', addressName);
    this.appendData('AddressNo', addressNo);
    this.appendData('AddressWard', addressWard);
    this.appendData('AddressDistrict', addressDistrict);
    this.appendData('AddressProvince', addressProvince);
    this.appendData('BackgroundFile', backgroundFile);
    this.appendData('LogoFile', logoFile);
    this.appendData('OrganizerName', organizerName);
    this.appendData('OrganizerInformation', organizerInformation);
    this.appendData('OrganizerLogoFile', organizerLogoFile);
    this.appendData('PaymentAccount', paymentAccount);
    this.appendData('PaymentNumber', paymentNumber);
    this.appendData('PaymentBankName', paymentBankName);
    this.appendData('PaymentBankBranch', paymentBankBranch);
    this.appendData('CategoryId', categoryId);
    this.appendData('UserId', userId);

    // Append tickets ShowTimes
    showTimes.forEach((showTime, index) => {
      this.appendData(
        `ShowTimes[${index}].ShowStartAt`,
        showTime.showStartAt.toISOString()
      );
      this.appendData(
        `ShowTimes[${index}].ShowEndAt`,
        showTime.showEndAt.toISOString()
      );
      this.appendData(
        `ShowTimes[${index}].SaleStartAt`,
        showTime.saleStartAt.toISOString()
      );
      this.appendData(
        `ShowTimes[${index}].SaleEndAt`,
        showTime.saleEndAt.toISOString()
      );

      // Append tickets
      showTime.tickets.forEach((ticket, ticketIndex) => {
        this.appendData(
          `ShowTimes[${index}].Tickets[${ticketIndex}].Name`,
          ticket.name
        );
        this.appendData(
          `ShowTimes[${index}].Tickets[${ticketIndex}].Price`,
          ticket.price
        );
        this.appendData(
          `ShowTimes[${index}].Tickets[${ticketIndex}].Quantity`,
          ticket.quantity
        );
        this.appendData(
          `ShowTimes[${index}].Tickets[${ticketIndex}].MinimumPurchase`,
          ticket.minimumPurchase
        );
        this.appendData(
          `ShowTimes[${index}].Tickets[${ticketIndex}].MaximumPurchase`,
          ticket.maximumPurchase
        );
        this.appendData(
          `ShowTimes[${index}].Tickets[${ticketIndex}].Description`,
          ticket.description
        );
      });
    });
  }
  appendData(key: string, value: any): void {
    if (value !== null && value !== undefined) {
      this.append(key, value);
    }
  }
}
