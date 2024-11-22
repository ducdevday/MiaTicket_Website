import { CommonModule } from '@angular/common';
import { Component, SimpleChanges } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterModule,
} from '@angular/router';
import {
  LOGIN_PATH,
  ORGANIZER_CHANGE_PASSWORD_PATH,
  ORGANIZER_CREATE_EVENTS_PATH,
  ORGANIZER_DASHBOARD_PATH,
  ORGANIZER_MY_EVENTS_PATH,
  ORGANIZER_PATH,
  ORGANIZER_PROFILE_PATH,
} from '../../app.routes';
import { UserModel } from '../../dto/model/user-model';
import { LocalStorageService } from '../../service/local-storage.service';
import { AccountService } from '../../service/account.service';
import { ToastService } from '../../service/toast.service';
import { MenuModule } from 'primeng/menu';
import { filter } from 'rxjs';

@Component({
  selector: 'app-organizer-layout',
  standalone: true,
  imports: [RouterModule, CommonModule, MenuModule],
  templateUrl: './organizer-layout.component.html',
  styleUrl: './organizer-layout.component.scss',
  providers: [LocalStorageService, AccountService],
})
export class OrganizerLayoutComponent {
  items: any[] | undefined;

  menuItems: MenuItem[] = [
    new MenuItem(
      'fa-solid fa-house',
      'Dashboard',
      `/${ORGANIZER_DASHBOARD_PATH}`
    ),
    new MenuItem('fas fa-user', 'My Profile', `/${ORGANIZER_PROFILE_PATH}`),
    new MenuItem(
      'fas fa-lock',
      'Change Password',
      `/${ORGANIZER_CHANGE_PASSWORD_PATH}`
    ),
    new MenuItem(
      'fa-regular fa-calendar-days',
      'My Events',
      `/${ORGANIZER_MY_EVENTS_PATH}`
    ),
    new MenuItem(
      'fa-regular fa-calendar-plus',
      'Create Event',
      `/${ORGANIZER_CREATE_EVENTS_PATH}`
    ),
  ];

  selectedMenuItemIndex!: number;

  isSidebarOpen = false;
  isAuthenticated: boolean = false;
  user!: UserModel;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private localStorageService: LocalStorageService,
    private accountService: AccountService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.setSelectedMenuItemIndex();
    this.items = [
      {
        label: 'Logout',
        icon: 'pi pi-sign-out',
        command: () => this.onLogoutClicked(),
      },
    ];
    const isAuth = this.localStorageService.getIsAuthenticated();
    if (isAuth) {
      this.isAuthenticated = true;
      this.accountService.getAccountInformation().subscribe({
        next: (response) => {
          this.user = response.data;
        },
      });
    }
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.setSelectedMenuItemIndex(); // Will log each time the URL changes
      });
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  ngOnChanges(changes: SimpleChanges): void {}

  setSelectedMenuItemIndex(): void {
    const currentUrl = this.router.url.split('?')[0];

    var menuIndex = this.menuItems.map((x) => x.path).indexOf(currentUrl);
    if (menuIndex >= 0) {
      this.selectedMenuItemIndex = menuIndex;
    }
  }

  onSelectMenuItem(index: number) {
    this.selectedMenuItemIndex = index;
    this.router.navigate([this.menuItems[index].path]);
  }

  onLoginOrRegisterClicked() {
    this.router.navigate([LOGIN_PATH]);
  }

  onAccountClicked() {
    this.router.navigate([ORGANIZER_PATH]);
  }

  onLogoutClicked() {
    this.accountService.logout().subscribe({
      next: (response) => {
        this.toastService.showSuccess('Logout Successfully');
        this.localStorageService.clear();
        this.router.navigate([LOGIN_PATH], {
          queryParamsHandling: 'merge',
        });
        window.location.reload();
      },
      error: (err) => {
        this.toastService.showError('Logout Failed');
      },
    });
  }
  goToHome() {
    this.router.navigate([ORGANIZER_PATH]);
  }
}

class MenuItem {
  icon!: string;
  title!: string;
  path!: string;
  constructor(icon: string, title: string, path: string) {
    this.icon = icon;
    this.title = title;
    this.path = path;
  }
}
