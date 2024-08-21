export class TimeUtil {
  static convertToISOString(datetime: string): string {
    // Ensure datetime is a Date object
    const dateObj = new Date(datetime);

    // Convert to UTC string
    return dateObj.toISOString();
  }
}
