export default class UpdateAccountRequest extends FormData {
  //   public string Name { get; set; }

  // public string PhoneNumber { get; set; }
  // public DateTime BirthDate { get; set; }

  // public int Gender { get; set; }
  // public IFormFile? AvatarFile { get; set; }

  constructor(
    name: string,
    phoneNumber: string,
    birthDate: string,
    gender: number,
    avatarFile: File | null
  ) {
    super();
    this.appendData('Name', name);
    this.appendData('PhoneNumber', phoneNumber);
    this.appendData('BirthDate', birthDate);
    this.appendData('Gender', gender);
    if (avatarFile) {
      this.appendData('AvatarFile', avatarFile);
    }
  }

  appendData(key: string, value: any): void {
    if (value !== null && value !== undefined) {
      this.append(key, value);
    }
  }
}
