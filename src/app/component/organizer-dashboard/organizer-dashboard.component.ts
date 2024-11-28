import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { ChartModule } from 'primeng/chart';
import EventCategoryFigureDto from '../../dto/model/event-category-figure-dto';
import EventParticipantDto from '../../dto/model/event-participant-dto';
import DirectoryOrganizerDto from '../../dto/model/directory-organizer-dto';
import { SummaryService } from '../../service/summary.service';
import { HttpErrorResponse } from '@angular/common/http';
import GetEventParticipantTimelineRequest from '../../dto/request/get-event-participant-timeline-request';
import { TimeUtil } from '../../utils/time-util';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-organizer-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, ChartModule, CalendarModule],
  templateUrl: './organizer-dashboard.component.html',
  styleUrl: './organizer-dashboard.component.scss',
})
export class OrganizerDashboardComponent {
  rangeDates: Date[] = [];
  maxDate: Date = new Date();
  categoryFigures: EventCategoryFigureDto[] = [];
  eventFigures: EventParticipantDto[] = [];
  organizers: DirectoryOrganizerDto[] = [];
  basicData: any;
  basicOptions: any;
  data: any;
  options: any;

  documentStyle = getComputedStyle(document.documentElement);
  textColor = this.documentStyle.getPropertyValue('--text-color');
  textColorSecondary = this.documentStyle.getPropertyValue(
    '--text-color-secondary'
  );
  surfaceBorder = this.documentStyle.getPropertyValue('--surface-border');

  constructor(private summaryService: SummaryService) {}

  ngOnInit() {
    this.fetchCategories();
    this.fetchOrganizers();
  }

  onDateTimeRangeChange(newRange: Date[]) {
    this.rangeDates = newRange;
    if (this.rangeDates.length == 2 && this.rangeDates[0] && this.rangeDates[1])
      this.fetchEvents();
  }

  fetchCategories() {
    this.summaryService.getSummaryEventCategories().subscribe({
      next: (response) => {
        this.categoryFigures = response.data;
        this.mapCategoryFiguresToChart();
      },
      error: (err: HttpErrorResponse) => {},
    });
  }

  fetchEvents() {
    var request = new GetEventParticipantTimelineRequest(
      TimeUtil.formatToISOString(this.rangeDates[0].toString()),
      TimeUtil.formatToISOString(this.rangeDates[1].toString())
    );
    this.summaryService.getEventParticipantTimeline(request).subscribe({
      next: (response) => {
        this.eventFigures = response.data;
        this.mapEventFiguresToChart();
      },
      error: (err: HttpErrorResponse) => {},
    });
  }

  fetchOrganizers() {
    this.summaryService.getDirectoryOrganizers().subscribe({
      next: (response) => {
        this.organizers = response.data;
        console.log(response.data);

        console.log(this.organizers);
      },
      error: (err: HttpErrorResponse) => {},
    });
  }

  mapCategoryFiguresToChart() {
    this.basicData = {
      labels: [...this.categoryFigures.map((c) => c.name)],
      datasets: [
        {
          label: 'Category',
          data: [...this.categoryFigures.map((c) => c.count)],
          backgroundColor: [
            'rgba(255, 159, 64, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(153, 102, 255, 0.2)',
          ],
          borderColor: [
            'rgb(255, 159, 64)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)',
          ],
          borderWidth: 1,
        },
      ],
    };

    this.basicOptions = {
      plugins: {
        legend: {
          labels: {
            color: this.textColor,
          },
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            color: this.textColorSecondary,
          },
          grid: {
            color: this.surfaceBorder,
            drawBorder: false,
          },
        },
        x: {
          ticks: {
            color: this.textColorSecondary,
          },
          grid: {
            color: this.surfaceBorder,
            drawBorder: false,
          },
        },
      },
    };
  }
  mapEventFiguresToChart() {
    this.data = {
      labels: [
        ...this.eventFigures.map((x) =>
          TimeUtil.formatShortDate(
            TimeUtil.convertUtcTimeToLocalTime(x.time.toString())
          )
        ),
      ],
      datasets: [
        {
          label: 'Event Participation',
          data: [...this.eventFigures.map((x) => x.count)],
          fill: false,
          borderColor: this.documentStyle.getPropertyValue('--blue-500'),
          tension: 0.4,
        },
      ],
    };
    this.options = {
      maintainAspectRatio: false,
      aspectRatio: 0.6,
      plugins: {
        legend: {
          labels: {
            color: this.textColor,
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: this.textColorSecondary,
          },
          grid: {
            color: this.surfaceBorder,
            drawBorder: false,
          },
        },
        y: {
          ticks: {
            color: this.textColorSecondary,
          },
          grid: {
            color: this.surfaceBorder,
            drawBorder: false,
          },
        },
      },
    };
  }
  getAvatar(avatar: string | undefined): string {
    if (avatar && avatar !== '') return avatar;
    return '/img_avatar_default.jpg';
  }
}
