import { Component, OnInit } from '@angular/core';
import { MenuLayoutComponent } from '../../common/menu-layout/menu-layout.component';
import { PaginatorModule } from 'primeng/paginator';
import { ButtonModule } from 'primeng/button';
import { ToastService } from '../../service/toast.service';
import { MessageService } from 'primeng/api';
import { Location } from '@angular/common';
import { MY_EVENTS_PATH } from '../../app.routes';
@Component({
  selector: 'app-my-events',
  standalone: true,
  imports: [MenuLayoutComponent, PaginatorModule, ButtonModule],
  templateUrl: './my-events.component.html',
  styleUrl: './my-events.component.scss',
  providers: [ToastService, MessageService, Location],
})
export class MyEventsComponent implements OnInit {
  first: number = 0;
  rows: number = 10;

  constructor(private toastService: ToastService, private location: Location) {}

  ngOnInit(): void {
    // this.location.replaceState(MY_EVENTS_PATH);
  }

  onPageChange(event: any) {
    console.log(event);
    this.first = event.first;
    this.rows = event.rows;
  }
}
