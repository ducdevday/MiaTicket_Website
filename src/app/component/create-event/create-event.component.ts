import { Component, OnInit } from '@angular/core';
import { MenuLayoutComponent } from '../../common/menu-layout/menu-layout.component';
import { StepsModule } from 'primeng/steps';
import { ToastService } from '../../service/toast.service';
import { MessageService } from 'primeng/api';
import { Location } from '@angular/common';
import { CREATE_EVENTS_PATH } from '../../app.routes';
@Component({
  selector: 'app-create-event',
  standalone: true,
  imports: [MenuLayoutComponent, StepsModule],
  templateUrl: './create-event.component.html',
  styleUrl: './create-event.component.scss',
  providers: [ToastService, MessageService, Location],
})
export class CreateEventComponent implements OnInit {
  items: any[] | undefined;

  activeIndex: number = 0;

  constructor(private toastService: ToastService, private location: Location) {}

  onActiveIndexChange(event: number) {
    this.activeIndex = event;
  }

  ngOnInit() {
    this.items = [
      {
        label: 'Event Information',
      },
      {
        label: 'Show Time & Ticket',
      },
      {
        label: 'Payment',
      },
    ];
    // this.location.replaceState(CREATE_EVENTS_PATH);
  }
}
