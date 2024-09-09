import { Component, OnInit } from '@angular/core';
import { MenuLayoutComponent } from '../../common/menu-layout/menu-layout.component';
import { PaginatorModule } from 'primeng/paginator';
import { ButtonModule } from 'primeng/button';
import { ToastService } from '../../service/toast.service';
import { MenuItem, MessageService } from 'primeng/api';
import { CommonModule, Location } from '@angular/common';
import { MY_EVENTS_PATH } from '../../app.routes';
import { EventStatus } from '../../dto/enum/event-status';
import { TabMenuModule } from 'primeng/tabmenu';
import { EventService } from '../../service/event.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import GetMyEventsRequest from '../../dto/request/get-my-events-request';
import PaginationModel from '../../dto/model/pagination-model';
import MyEventModel from '../../dto/model/my-event-model';
import { TimeUtil } from '../../utils/time-util';
@Component({
  selector: 'app-my-events',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MenuLayoutComponent,
    PaginatorModule,
    ButtonModule,
    TabMenuModule,
  ],
  templateUrl: './my-events.component.html',
  styleUrl: './my-events.component.scss',
  providers: [ToastService, MessageService, Location, EventService],
})
export class MyEventsComponent implements OnInit {
  eventStatuses: MenuItem[] = [];
  activeEventStatus: MenuItem | undefined;

  PAGE_INDEX: number = 1;
  PAGE_SIZE: number = 1;
  pagination!: PaginationModel;
  myEvents: MyEventModel[] = [];
  searchForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private toastService: ToastService,
    private location: Location,
    private eventService: EventService
  ) {
    this.searchForm = this.fb.group({
      keyword: ['', Validators.required],
    });
  }

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
    this.pagination = new PaginationModel(
      this.PAGE_INDEX,
      this.PAGE_SIZE,
      0,
      0
    );
    this.fetchMyEventData();
  }

  fetchMyEventData() {
    const { keyword }: { keyword: string } = this.searchForm.value;
    const eventStatus = this.activeEventStatus?.['value'];
    var getMyEventsRequest = new GetMyEventsRequest(
      keyword,
      eventStatus,
      this.pagination.currentPage,
      this.pagination.currentSize
    );

    this.eventService.getMyEvents(getMyEventsRequest).subscribe({
      next: (response) => {
        this.pagination = Object.assign(response.data.pagination);
        this.myEvents = Array.from(response.data.items);
      },
      error: (err) => {},
    });
  }

  eventDateTimeFormatted(input: string): string {
    const dateTime = TimeUtil.convertUtcTimeToLocalTime(input);
    const result = TimeUtil.formatLongDateTime(dateTime);
    return result;
  }

  onActiveEventStatusChange(eventStatus: MenuItem) {
    this.activeEventStatus = eventStatus;
    this.fetchMyEventData();
  }

  onPageChange(event: any) {
    this.pagination.currentPage = event.page + 1;
    this.fetchMyEventData();
  }
  onSearch() {
    console.log('searching...');
    if (this.searchForm.valid) {
      this.fetchMyEventData();
    }
  }
}
