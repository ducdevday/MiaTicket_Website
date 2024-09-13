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

  static formatDateTimeRange(date1: Date, date2: Date): string {
    const formatTime = (date: Date) => {
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      return `${hours}:${minutes}`;
    };

    const formatDate = (date: Date) => {
      const day = date.getDate();
      const month = date.toLocaleString('default', { month: 'short' });
      const year = date.getFullYear();
      return `${day} ${month}, ${year}`;
    };

    const time1 = formatTime(date1);
    const time2 = formatTime(date2);
    const date1Formatted = formatDate(date1);
    const date2Formatted = formatDate(date2);

    // So sánh nếu cùng ngày, tháng hoặc năm
    if (date1.getFullYear() === date2.getFullYear()) {
      if (date1.getMonth() === date2.getMonth()) {
        if (date1.getDate() === date2.getDate()) {
          // Cùng ngày
          return `${time1} - ${time2}, ${date1Formatted}`;
        }
        // Cùng tháng
        const day1 = date1.getDate();
        const day2 = date2.getDate();
        const monthYear = date1.toLocaleString('default', {
          month: 'short',
          year: 'numeric',
        });
        return `${time1}, ${day1} - ${time2}, ${day2} ${monthYear}`;
      }
      // Cùng năm
      const monthDay1 = date1.toLocaleString('default', {
        day: 'numeric',
        month: 'short',
      });
      const monthDay2 = date2.toLocaleString('default', {
        day: 'numeric',
        month: 'short',
      });
      return `${time1}, ${monthDay1} - ${time2}, ${monthDay2} ${date1.getFullYear()}`;
    }

    // Khác năm
    return `${time1}, ${date1Formatted} - ${time2}, ${date2Formatted}`;
  }

  static formatHomeDateTime(date: Date): string {
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.getFullYear();

    return `${day} ${month}, ${year}`;
  }

  static formatCurrency(value: number): string {
    return value.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, '.') + 'đ';
  }
}
