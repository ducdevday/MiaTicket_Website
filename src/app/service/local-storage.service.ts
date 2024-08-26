import { Injectable } from '@angular/core';
import { UserModel } from '../dto/model/user-model';

const USER_KEY: string = 'user';
const ACCESS_TOKEN_KEY: string = 'access_token';
const REFRESH_TOKEN_KEY: string = 'refresh_token';
const IS_AUTHENTICATED: string = 'is_authenticated';
@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}
  clear(): void {
    window.localStorage.clear();
  }

  public saveUser(user: any): void {
    window.localStorage.removeItem(USER_KEY);
    window.localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): UserModel | null {
    const user = window.localStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user) as UserModel;
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

  public isLoggedIn(): boolean {
    const user = window.localStorage.getItem(USER_KEY);
    if (user) {
      return true;
    }
    return false;
  }
}
