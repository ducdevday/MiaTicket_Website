export class TimeUtil {
  static formatToISOString(datetime: string): string {
    const dateObj = new Date(datetime);

    return dateObj.toISOString();
  }

  static formatShortDateTime(date: Date): string {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Tháng bắt đầu từ 0
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${day}-${month}-${year} - ${hours}:${minutes}`;
  }

  static convertUtcTimeToLocalTime(utcTime: string): Date {
    const date = new Date(utcTime);
    const localDate = new Date(
      date.getTime() - date.getTimezoneOffset() * 60000
    );
    return localDate;
  }

  static formatLongDateTime(dateTime: Date): string {
    const dayOfWeek = new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
    }).format(dateTime); // Tự động lấy ngày trong tuần theo ngôn ngữ hệ thống
    const day = ('0' + dateTime.getDate()).slice(-2); // Lấy ngày (định dạng 2 chữ số)
    const month = ('0' + (dateTime.getMonth() + 1)).slice(-2); // Lấy tháng (định dạng 2 chữ số)
    const year = dateTime.getFullYear(); // Lấy năm
    const hours = ('0' + dateTime.getHours()).slice(-2); // Lấy giờ (định dạng 2 chữ số)
    const minutes = ('0' + dateTime.getMinutes()).slice(-2); // Lấy phút (định dạng 2 chữ số)

    return `${
      dayOfWeek.charAt(0).toUpperCase() + dayOfWeek.slice(1)
    } ${day}/${month}/${year} (${hours}:${minutes})`;
  }
}
