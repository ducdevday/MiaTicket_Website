import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { HeaderComponent } from '../../common/header/header.component';
import { FooterComponent } from '../../common/footer/footer.component';
import {
  CHANGE_PASSWORD_PATH,
  CREATE_EVENTS_PATH,
  MY_EVENTS_PATH,
  MY_ORDERS_PATH,
  PROFILE_PATH,
} from '../../app.routes';
import { ProfileComponent } from '../profile/profile.component';
import { ChangePasswordComponent } from '../change-password/change-password.component';
import { MyEventsComponent } from '../my-events/my-events.component';
import { CreateEventComponent } from '../create-event/create-event.component';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { MyOrdersComponent } from '../my-orders/my-orders.component';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    ProfileComponent,
    ChangePasswordComponent,
    MyOrdersComponent,
    MyEventsComponent,
    CreateEventComponent,
    CommonModule,
    ToastModule,
    RouterModule,
  ],
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
  providers: [MessageService],
})
export class AccountComponent implements OnInit, OnChanges {
  menuItems: string[] = [
    `/${PROFILE_PATH}`,
    `/${CHANGE_PASSWORD_PATH}`,
    `/${MY_ORDERS_PATH}`,
    `/${MY_EVENTS_PATH}`,
    `/${CREATE_EVENTS_PATH}`,
  ];

  selectedMenuItemIndex!: number;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.setSelectedMenuItemIndex();
  }

  ngOnChanges(changes: SimpleChanges): void {}

  setSelectedMenuItemIndex(): void {
    const currentUrl = this.router.url.split('?')[0];

    this.selectedMenuItemIndex = this.menuItems.indexOf(currentUrl);

    if (this.selectedMenuItemIndex === -1) {
      this.selectedMenuItemIndex = 0;
    }
  }

  onSelectMenuItem(index: number) {
    this.selectedMenuItemIndex = index;
    this.router.navigate([this.menuItems[index]]);
  }
}
