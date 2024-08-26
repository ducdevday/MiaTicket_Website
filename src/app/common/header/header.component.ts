import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { LocalStorageService } from '../../service/local-storage.service';
import { Router } from '@angular/router';
import { HOME_PATH, LOGIN_PATH, PROFILE_PATH } from '../../app.routes';
import { AccountService } from '../../service/account.service';
import { UserModel } from '../../dto/model/user-model';
import { LogoutRequest } from '../../dto/request/logout-request';
import { ToastService } from '../../service/toast.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MenuModule, ButtonModule, CommonModule, ToastModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  providers: [
    LocalStorageService,
    AccountService,
    ToastService,
    MessageService,
  ],
})
export class HeaderComponent {
  items: any[] | undefined;
  isAuthenticated: boolean = false;
  constructor(
    private localStorageService: LocalStorageService,
    private accountService: AccountService,
    private toastService: ToastService,
    private router: Router
  ) {
    this.localStorageService = localStorageService;
  }
  ngOnInit() {
    this.items = [
      {
        label: 'My Account',
        icon: 'pi pi-user',
        command: () => this.onAccountClicked(),
      },
      {
        label: 'Logout',
        icon: 'pi pi-sign-out',
        command: () => this.onLogoutClicked(),
      },
    ];
    const isAuth = this.localStorageService.getIsAuthenticated();
    if (isAuth) this.isAuthenticated = true;
  }

  onLoginOrRegisterClicked() {
    this.router.navigate([LOGIN_PATH]);
  }

  onAccountClicked() {
    this.router.navigate([PROFILE_PATH]);
  }

  onLogoutClicked() {
    const user = this.localStorageService.getUser();
    if (user !== null && user !== undefined) {
      const userId = user.id;
      this.accountService.logout(new LogoutRequest(userId)).subscribe({
        next: (response) => {
          this.toastService.showSuccess('Logout Successfully');
          this.localStorageService.clear();
          this.router.navigate([HOME_PATH]);
          window.location.reload();
        },
        error: (err) => {
          this.toastService.showError('Logout Failed');
        },
      });
    }
  }
}
