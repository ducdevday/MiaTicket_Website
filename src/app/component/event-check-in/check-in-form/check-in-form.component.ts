import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import OrderTicketDetailModel from '../../../dto/model/order-ticket-detail-model';
import { ActivatedRoute } from '@angular/router';
import { ToastService } from '../../../service/toast.service';
import { EventService } from '../../../service/event.service';
import { OrganizerService } from '../../../service/organizer.service';
import CheckInEventRequest from '../../../dto/request/check-in-event-request';
import { HttpErrorResponse } from '@angular/common/http';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-check-in-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    TableModule,
    DialogModule,
  ],
  templateUrl: './check-in-form.component.html',
  styleUrl: './check-in-form.component.scss',
})
export class CheckInFormComponent {
  @Input() isCheckInFormVisible: boolean = false;
  @Output() isCheckInFormVisibleChange = new EventEmitter<boolean>();

  eventId!: number;
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

  onFormClose() {
    this.isCheckInFormVisibleChange.emit(false);
    this.searchForm.reset();
  }
}
