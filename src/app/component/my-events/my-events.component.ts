import { CommonModule, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { PaginatorModule } from 'primeng/paginator';
import { TabMenuModule } from 'primeng/tabmenu';
import { ProcessingComponent } from '../../common/processing/processing.component';
import { EventStatus } from '../../dto/enum/event-status';
import MyEventModel from '../../dto/model/my-event-model';
import PaginationModel from '../../dto/model/pagination-model';
import GetMyEventsRequest from '../../dto/request/get-my-events-request';
import { EventService } from '../../service/event.service';
import { ProcessingService } from '../../service/processing.service';
import { TimeUtil } from '../../utils/time-util';
import { EmptyComponent } from '../../common/empty/empty.component';
@Component({
  selector: 'app-my-events',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PaginatorModule,
    ButtonModule,
    TabMenuModule,
    ProcessingComponent,
    EmptyComponent,
  ],
  templateUrl: './my-events.component.html',
  styleUrl: './my-events.component.scss',
  providers: [Location, EventService],
})
export class MyEventsComponent implements OnInit {
  eventStatuses: MenuItem[] = [];
  activeEventStatus: MenuItem | undefined;

  PAGE_INDEX: number = 1;
  PAGE_SIZE: number = 3;
  pagination!: PaginationModel;
  myEvents: MyEventModel[] = [];
  searchForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private location: Location,
    private eventService: EventService,
    private processingService: ProcessingService
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
      this.pagination.currentPageIndex,
      this.pagination.currentPageSize
    );

    this.eventService.getMyEvents(getMyEventsRequest).subscribe({
      next: (response) => {
        this.myEvents = response.data;
        this.pagination.totalRecords = response.totalRecords;
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
    if (this.activeEventStatus != eventStatus) {
      this.activeEventStatus = eventStatus;
      this.fetchMyEventData();
    }
  }

  onPageChange(event: any) {
    this.pagination.currentPageIndex = event.page + 1;
    this.fetchMyEventData();
  }
  onSearch() {
    if (this.searchForm.valid) {
      this.fetchMyEventData();
    }
  }
}
