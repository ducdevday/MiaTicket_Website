import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../common/header/header.component';
import { FooterComponent } from '../../common/footer/footer.component';
import {
  CHANGE_PASSWORD_PATH,
  CREATE_EVENTS_PATH,
  MY_EVENTS_PATH,
  MY_TICKETS_PATH,
  PROFILE_PATH,
} from '../../app.routes';
import { ProfileComponent } from '../profile/profile.component';
import { ChangePasswordComponent } from '../change-password/change-password.component';
import { MyTicketsComponent } from '../my-tickets/my-tickets.component';
import { MyEventsComponent } from '../my-events/my-events.component';
import { CreateEventComponent } from '../create-event/create-event.component';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    ProfileComponent,
    ChangePasswordComponent,
    MyTicketsComponent,
    MyEventsComponent,
    CreateEventComponent,
    CommonModule,
    ToastModule,
    RouterModule,
  ],
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss',
  providers: [MessageService, Router],
})
export class AccountComponent implements OnInit {
  menuItems: string[] = [
    PROFILE_PATH,
    CHANGE_PASSWORD_PATH,
    MY_TICKETS_PATH,
    MY_EVENTS_PATH,
    CREATE_EVENTS_PATH,
  ];

  selectedMenuItemIndex!: number;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.setSelectedMenuItemIndex();
  }

  setSelectedMenuItemIndex(): void {
    const currentUrl = this.router.url.split('?')[0].substring(1);
    console.log(currentUrl);
    // Find the index of the current URL in the menuItems array
    this.selectedMenuItemIndex = this.menuItems.indexOf(currentUrl);

    // Handle the case where the URL might not match any menu item
    if (this.selectedMenuItemIndex === -1) {
      // Optional: set to a default index or handle as needed
      this.selectedMenuItemIndex = 0;
    }
  }

  onSelectMenuItem(index: number) {
    this.selectedMenuItemIndex = index;
    this.router.navigate([this.menuItems[index]]);
  }
}
