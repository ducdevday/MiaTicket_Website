import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastService } from '../../service/toast.service';
import { OrganizerService } from '../../service/organizer.service';
import CheckInEventRequest from '../../dto/request/check-in-event-request';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import OrderTicketModel from '../../dto/model/order-ticket-model';
import OrderTicketDetailModel from '../../dto/model/order-ticket-detail-model';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { EventService } from '../../service/event.service';

@Component({
  selector: 'app-event-check-in',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonModule, TableModule],
  templateUrl: './event-check-in.component.html',
  styleUrl: './event-check-in.component.scss',
})
export class EventCheckInComponent {
  eventId!: number;
  eventName!: string;

  searchForm!: FormGroup;

  tickets: OrderTicketDetailModel[] = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private toastService: ToastService,
    private eventService: EventService,
    private organizerService: OrganizerService
  ) {
    this.searchForm = this.fb.group({
      code: ['', Validators.required],
    });
    this.onInitData();
  }

  onInitData() {
    this.eventId = this.route.snapshot.params['eventId'];
    this.fetchEventName();
  }
  fetchEventName() {
    this.eventService.getEventName(this.eventId).subscribe({
      next: (response) => {
        this.eventName = response.data;
      },
      error: (err: HttpErrorResponse) => {
        this.eventName = '';
      },
    });
  }

  onSearchButtonPressed() {
    if (this.searchForm.valid) {
      const { code } = this.searchForm.value;
      var request = new CheckInEventRequest(code);
      this.organizerService.checkInEvent(this.eventId, request).subscribe({
        next: (response) => {
          this.toastService.showSuccess(response.message);
          this.tickets = response.data;
        },
        error: (err: HttpErrorResponse) => {
          this.toastService.showError(err.error.message);
          this.tickets = [];
        },
      });
    }
  }
}
