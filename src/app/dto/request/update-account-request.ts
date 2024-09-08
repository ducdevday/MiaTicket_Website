export default class UpdateAccountRequest extends FormData {
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
