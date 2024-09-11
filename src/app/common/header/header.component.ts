import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { ToastModule } from 'primeng/toast';
import {
  HOME_PATH,
  LOGIN_PATH,
  PROFILE_PATH,
  SEARCH_PATH,
} from '../../app.routes';
import { AccountService } from '../../service/account.service';
import { EventService } from '../../service/event.service';
import { LocalStorageService } from '../../service/local-storage.service';
import { ToastService } from '../../service/toast.service';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MenuModule,
    ButtonModule,
    CommonModule,
    ToastModule,
  ],
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
  searchForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private localStorageService: LocalStorageService,
    private accountService: AccountService,
    private toastService: ToastService,
    private router: Router,
    private eventService: EventService
  ) {
    this.searchForm = this.fb.group({ keyword: ['', Validators.required] });
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
    this.accountService.logout().subscribe({
      next: (response) => {
        this.toastService.showSuccess('Logout Successfully');
        this.localStorageService.clear();
        this.router.navigate([HOME_PATH], {
          queryParamsHandling: 'merge',
        });
        window.location.reload();
      },
      error: (err) => {
        this.toastService.showError('Logout Failed');
      },
    });
  }

  onSearch() {
    if (this.searchForm.valid) {
      const { keyword } = this.searchForm.value;
      this.router.navigate([SEARCH_PATH], {
        queryParams: { keyword },
      });
    }
  }
}
