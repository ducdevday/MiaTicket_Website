import {
  HTTP_INTERCEPTORS,
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable, Provider } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  filter,
  Observable,
  switchMap,
  take,
  tap,
  throwError,
} from 'rxjs';
import { LocalStorageService } from '../service/local-storage.service';
import { GenerateTokenRequest } from '../dto/request/generate-token-request';
import { TokenService } from '../service/token.service';
import { Router } from '@angular/router';
import { GenerateTokenResponse } from '../dto/response/generate-token-response';
import { LOGIN_PATH } from '../app.routes';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshToken$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  constructor(
    private localStorageService: LocalStorageService,
    private tokenService: TokenService,
    private router: Router
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // const isAuthenticated = this.localStorageService.getIsAuthenticated();
    // if (isAuthenticated) return next.handle(req);
    const token = this.localStorageService.getAccessToken();

    const cloneRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });

    return next.handle(cloneRequest).pipe(
      catchError((error: any) => {
        if (error instanceof HttpErrorResponse && error.status === 401) {
          return this.handle401Error(cloneRequest, next);
        }
        // Handle more error
        return throwError(error);
      })
    );
  }

  handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshToken$.next(null);
      return this.tokenService.generateToken().pipe(
        catchError((error: any) => {
          this.localStorageService.clear();
          this.router.navigate([LOGIN_PATH]);
          this.isRefreshing = false;
          return throwError(error);
        }),
        tap((data: GenerateTokenResponse) => {
          this.localStorageService.saveAccessToken(data.data.accessToken);
          this.isRefreshing = false;
          // ! Notify that generateToken is complete
          // this.refreshToken$.next(data.data.refreshToken);
          this.refreshToken$.next('GENERATED');
        }),
        switchMap((data: GenerateTokenResponse) => {
          var newRequest = this.addTokenToHeader(
            data.data.accessToken,
            request
          );
          return next.handle(newRequest);
        })
      );
    }

    return this.refreshToken$.pipe(
      filter((data) => data !== null),
      take(1),
      switchMap((token) => {
        const newRequest = this.addTokenToHeader(token, request);
        return next.handle(newRequest);
      })
    );
  }

  addTokenToHeader(token: string, request: HttpRequest<any>) {
    var newRequest = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
    return newRequest;
  }
}

export const AUTH_INTERCEPTOR_PROVIDER: Provider = {
  provide: HTTP_INTERCEPTORS,
  useClass: AuthInterceptor,
  multi: true,
};
