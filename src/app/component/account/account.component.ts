import { CommonModule } from '@angular/common';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import {
  CHANGE_PASSWORD_PATH,
  MY_ORDERS_PATH,
  PROFILE_PATH,
} from '../../app.routes';
import { UserModel } from '../../dto/model/user-model';
import { AccountService } from '../../service/account.service';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [CommonModule, ToastModule, RouterModule],
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
  providers: [MessageService, AccountService],
})
export class AccountComponent implements OnInit, OnChanges {
  menuItems: MenuItem[] = [
    new MenuItem('fas fa-user', 'My Profile', `/${PROFILE_PATH}`),
    new MenuItem('fas fa-lock', 'Change Password', `/${CHANGE_PASSWORD_PATH}`),
    new MenuItem('fa-solid fa-ticket', 'My Orders', `/${MY_ORDERS_PATH}`),
  ];
  selectedMenuItemIndex!: number;
  isSidebarOpen = false;
  user!: UserModel;

  constructor(private router: Router, private accountService: AccountService) {}

  ngOnInit(): void {
    this.setSelectedMenuItemIndex();
    this.accountService.getAccountInformation().subscribe({
      next: (response) => {
        this.user = response.data;
      },
    });
  }

  ngOnChanges(changes: SimpleChanges): void {}

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
  setSelectedMenuItemIndex(): void {
    const currentUrl = this.router.url.split('?')[0];

    this.selectedMenuItemIndex = this.menuItems
      .map((x) => x.path)
      .indexOf(currentUrl);

    if (this.selectedMenuItemIndex === -1) {
      this.selectedMenuItemIndex = 0;
    }
  }

  onSelectMenuItem(index: number) {
    this.selectedMenuItemIndex = index;
    this.router.navigate([this.menuItems[index].path]);
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
