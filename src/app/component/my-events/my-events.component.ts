import { Component, OnInit } from '@angular/core';
import { MenuLayoutComponent } from '../../common/menu-layout/menu-layout.component';
import { PaginatorModule } from 'primeng/paginator';
import { ButtonModule } from 'primeng/button';
import { ToastService } from '../../service/toast.service';
import { MenuItem, MessageService } from 'primeng/api';
import { Location } from '@angular/common';
import { MY_EVENTS_PATH } from '../../app.routes';
import { EventStatus } from '../../dto/enum/event-status';
import { TabMenuModule } from 'primeng/tabmenu';
@Component({
  selector: 'app-my-events',
  standalone: true,
  imports: [MenuLayoutComponent, PaginatorModule, ButtonModule, TabMenuModule],
  templateUrl: './my-events.component.html',
  styleUrl: './my-events.component.scss',
  providers: [ToastService, MessageService, Location],
})
export class MyEventsComponent implements OnInit {
  eventStatuses: MenuItem[] = [];
  activeEventStatus: MenuItem | undefined;
  first: number = 0;
  rows: number = 10;

  constructor(private toastService: ToastService, private location: Location) {}

  ngOnInit(): void {
    // this.location.replaceState(MY_EVENTS_PATH);
    this.eventStatuses = [
      {
        label: EventStatus[EventStatus.Pending],
        icon: 'pi pi-spinner-dotted',
        value: EventStatus.Pending,
      },
      {
        label: EventStatus[EventStatus.Accepted],
        icon: 'pi pi-check-circle',
        value: EventStatus.Accepted,
      },
      {
        label: EventStatus[EventStatus.Rejected],
        icon: 'pi pi-minus-circle',
        value: EventStatus.Rejected,
      },
    ];
    this.activeEventStatus = this.eventStatuses[1];
  }

  onActiveEventStatusChange(eventStatus: MenuItem) {
    this.activeEventStatus = eventStatus;
  }

  onPageChange(event: any) {
    console.log(event);
    this.first = event.first;
    this.rows = event.rows;
  }
}
