import { Component, OnInit } from '@angular/core';
import { PaginatorModule } from 'primeng/paginator';
import { ToastService } from '../../service/toast.service';
import { MessageService } from 'primeng/api';
import { Location } from '@angular/common';
import { MY_TICKETS_PATH } from '../../app.routes';

@Component({
  selector: 'app-my-tickets',
  standalone: true,
  imports: [PaginatorModule],
  templateUrl: './my-tickets.component.html',
  styleUrl: './my-tickets.component.scss',
  providers: [ToastService, MessageService, Location],
})
export class MyTicketsComponent implements OnInit {
  constructor(
    private toastService: ToastService,
    private messageService: MessageService,
    private location: Location
  ) {}

  ngOnInit(): void {
    // this.location.replaceState(MY_TICKETS_PATH);
  }
}
