import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { LocalStorageService } from './local-storage.service';
import { LOGIN_PATH } from '../app.routes';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  constructor(
    private localStorageService: LocalStorageService,
    private router: Router
  ) {
    this.localStorageService = localStorageService;
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const isAuthenticated = this.localStorageService.getIsAuthenticated();
    if (isAuthenticated) {
      return true;
    } else {
      this.router.navigate([LOGIN_PATH]);
      return false;
    }
  }
}
