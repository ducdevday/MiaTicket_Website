import { KeyValue } from '@angular/common';
import { Injectable } from '@angular/core';
import { Role } from '../dto/enum/role';

const USER_ID_KEY: string = 'user_id';
const ACCESS_TOKEN_KEY: string = 'access_token';
const IS_AUTHENTICATED: string = 'is_authenticated';
const ROLE_KEY: string = 'role';
const CART_ITEM_EVENT: string = 'event_id';
const CART_ITEM_SHOWTIME: string = 'show_time';
const CART_ITEM_TICKETS: string = 'ticket_list';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}
  clear(): void {
    window.localStorage.clear();
  }

  public saveUserId(userId: string): void {
    window.localStorage.setItem(USER_ID_KEY, userId);
  }

  public getUserId(): string | null {
    const userId = window.localStorage.getItem(USER_ID_KEY);
    if (userId) {
      return userId;
    }
    return null;
  }

  public saveIsAuthenticated(isAuthenticated: boolean): void {
    window.localStorage.removeItem(IS_AUTHENTICATED);
    window.localStorage.setItem(
      IS_AUTHENTICATED,
      JSON.stringify(isAuthenticated)
    );
  }

  public getIsAuthenticated(): boolean {
    const isAuthenticated = window.localStorage.getItem(IS_AUTHENTICATED);
    if (isAuthenticated != null && isAuthenticated) {
      return true;
    }

    return false;
  }

  public saveAccessToken(accessToken: string): void {
    window.localStorage.removeItem(ACCESS_TOKEN_KEY);
    window.localStorage.setItem(ACCESS_TOKEN_KEY, JSON.stringify(accessToken));
  }

  public getAccessToken(): string | null {
    const accessToken = window.localStorage.getItem(ACCESS_TOKEN_KEY);
    if (accessToken) {
      return JSON.parse(accessToken);
    }

    return null;
  }

  public saveRole(role: Role): void {
    window.localStorage.removeItem(ROLE_KEY);
    window.localStorage.setItem(ROLE_KEY, JSON.stringify(role));
  }

  public getRole(): Role | null {
    const role = window.localStorage.getItem(ROLE_KEY);
    if (role) {
      return JSON.parse(role) as Role;
    }
    return null;
  }

  public setCartItem(
    eventId: number | string,
    showtimeId: number | string,
    tickets: KeyValue<any, any>[] // Item1: ticketId, Item2: quantity
  ) {
    localStorage.setItem(CART_ITEM_EVENT, String(eventId));
    localStorage.setItem(CART_ITEM_SHOWTIME, String(showtimeId));
    this.convertArrayToLocalStorage(CART_ITEM_TICKETS, tickets);
  }

  public getCartItem() {
    var eventId = localStorage.getItem(CART_ITEM_EVENT);
    var showtimeId = localStorage.getItem(CART_ITEM_SHOWTIME);
    var tickets = this.convertLocalStorageToArray(CART_ITEM_TICKETS);
    return {
      eventId,
      showtimeId,
      tickets,
    };
  }

  public clearCartItem() {
    localStorage.removeItem(CART_ITEM_EVENT);
    localStorage.removeItem(CART_ITEM_SHOWTIME);
    localStorage.removeItem(CART_ITEM_TICKETS);
  }

  private convertArrayToLocalStorage(key: string, pairs: KeyValue<any, any>[]) {
    var data = pairs.map((x) => `${x.key}-${x.value}`);
    localStorage.setItem(key, data.join('|'));
  }

  private convertLocalStorageToArray(key: string): KeyValue<any, any>[] {
    const data = localStorage.getItem(key);
    if (data !== null) {
      try {
        const split = data.split('|');
        const resVal = split.map((item) => {
          const [key, value] = item.split('-');
          return { key, value };
        });
        return resVal;
      } catch (error) {
        console.error('Error parsing localStorage data:', error);
        return [];
      }
    }
    return [];
  }
}
