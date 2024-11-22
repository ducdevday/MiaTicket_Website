import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from '../../service/toast.service';
import { OrganizerService } from '../../service/organizer.service';
import CheckInEventRequest from '../../dto/request/check-in-event-request';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import OrderTicketModel from '../../dto/model/order-ticket-model';
import OrderTicketDetailModel from '../../dto/model/order-ticket-detail-model';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { EventService } from '../../service/event.service';
import { CheckInFormComponent } from './check-in-form/check-in-form.component';
import TicketCheckInModel from '../../dto/model/ticket-checkin-model';
import GetCheckInEventReportRequest from '../../dto/request/get-checkin-event-report-request';
import { DropdownModule } from 'primeng/dropdown';
import DropDownModel from '../../dto/model/drop-down-model';
import { TimeUtil } from '../../utils/time-util';
import GetCheckInEventReportModel from '../../dto/model/get-check-in-event-report-model';
import CurrencyUtil from '../../utils/currency-util';

@Component({
  selector: 'app-event-check-in',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    TableModule,
    CheckInFormComponent,
    DropdownModule,
  ],
  templateUrl: './event-check-in.component.html',
  styleUrl: './event-check-in.component.scss',
})
export class EventCheckInComponent implements OnInit {
  eventId!: number;
  eventName!: string;
  showTimeId!: number;
  showTimes: DropDownModel[] = [];
  showTimeChosen?: DropDownModel;
  isCheckInFormVisible: boolean = false;

  ticketCheckInReport: GetCheckInEventReportModel | null = null;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private eventService: EventService,
    private organizerService: OrganizerService
  ) {
    this.onInitData();
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.getQueryParams(params);
    });
  }

  onInitData() {
    this.eventId = this.route.snapshot.params['eventId'];
    this.fetchEventName();
    this.fetchEventShowTime();
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

  fetchEventShowTime() {
    this.eventService.getEventShowTime(this.eventId).subscribe({
      next: (response) => {
        this.showTimes = response.data.map(
          (x) =>
            new DropDownModel(
              TimeUtil.formatDateTimeRange(
                TimeUtil.convertUtcTimeToLocalTime(x.showStartAt.toString()),
                TimeUtil.convertUtcTimeToLocalTime(x.showEndAt.toString())
              ),
              x.id
            )
        );
        this.showTimeChosen = this.showTimes.find(
          (x) => x.value == this.showTimeId
        );
      },
      error: (err: HttpErrorResponse) => {
        this.showTimes = [];
      },
    });
  }

  fetchEventCheckInDetail(showTimeId: number) {
    var request = new GetCheckInEventReportRequest(showTimeId);
    this.organizerService
      .getCheckInEventReport(this.eventId, request)
      .subscribe({
        next: (response) => {
          this.ticketCheckInReport = response.data;
        },
        error: (err: HttpErrorResponse) => {},
      });
  }

  openCheckInForm() {
    this.isCheckInFormVisible = true;
  }

  getQueryParams(params: any) {
    this.showTimeId = params.showTimeId;
    if (this.showTimeId != null && !isNaN(this.showTimeId)) {
      this.fetchEventCheckInDetail(this.showTimeId);
    }
  }

  setQueryParams(params: any) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: params,
      queryParamsHandling: 'merge',
    });
  }

  onShowTimeChange(selectedShowTime: DropDownModel): void {
    this.showTimeId = selectedShowTime.value;
    this.setQueryParams({ showTimeId: this.showTimeId });
  }

  formatTicketPrice(price: number): string {
    return CurrencyUtil.formatCurrency(price);
  }
}
