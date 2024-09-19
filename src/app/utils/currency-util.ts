export default class CurrencyUtil {
  static formatCurrency(value: number): string {
    return value.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, '.') + 'đ';
  }
}
