import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import DropDownModel from '../../dto/model/drop-down-model';
import { OrderService } from '../../service/order.service';
import { EventService } from '../../service/event.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { TimeUtil } from '../../utils/time-util';
import CurrencyUtil from '../../utils/currency-util';
import GetOrderSummaryRevenueRequest from '../../dto/request/get-order-summary-revenue-request';
import GetOrderSummaryRevenueDto from '../../dto/model/get-order-summary-revenue-dto';
import { CalendarModule } from 'primeng/calendar';
import { ChartModule } from 'primeng/chart';
import OrderSummaryFigureDto from '../../dto/model/order-summary-figure-dto';
import GetOrderSummaryFiguresRequest from '../../dto/request/get-order-summary-figure-request';
@Component({
  selector: 'app-order-summary',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    TableModule,
    DropdownModule,
    CalendarModule,
    ChartModule,
  ],
  templateUrl: './order-summary.component.html',
  styleUrl: './order-summary.component.scss',
})
export class OrderSummaryComponent {
  eventId!: number;
  eventName!: string;
  showTimeId!: number;
  showTimes: DropDownModel[] = [];
  showTimeChosen?: DropDownModel;
  rangeDates: Date[] = [];
  maxDate: Date = new Date();
  orderSummaryRevenue: GetOrderSummaryRevenueDto | null = null;
  orderSummaryFigures: OrderSummaryFigureDto[] = [];
  data: any;
  options: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private eventService: EventService,
    private orderService: OrderService
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

  fetchOrderSummaryRevenue(showTimeId: number) {
    var request = new GetOrderSummaryRevenueRequest(showTimeId);
    this.orderService.getOrderSummaryRevenue(this.eventId, request).subscribe({
      next: (response) => {
        this.orderSummaryRevenue = response.data;
      },
      error: (err: HttpErrorResponse) => {},
    });
  }

  getQueryParams(params: any) {
    this.showTimeId = params.showTimeId;
    if (this.showTimeId != null && !isNaN(this.showTimeId)) {
      this.fetchOrderSummaryRevenue(this.showTimeId);
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

  formatPrice(price: number): string {
    return CurrencyUtil.formatCurrency(price);
  }
  onDateTimeRangeChange(newRange: Date[]) {
    this.rangeDates = newRange;
    if (this.rangeDates.length == 2 && this.rangeDates[0] && this.rangeDates[1])
      this.fetchOrderSummaryFigure();
  }
  fetchOrderSummaryFigure() {
    var request = new GetOrderSummaryFiguresRequest(
      this.showTimeId,
      TimeUtil.formatToISOString(this.rangeDates[0].toString()),
      TimeUtil.formatToISOString(this.rangeDates[1].toString())
    );
    this.orderService.getOrderSummaryFigure(this.eventId, request).subscribe({
      next: (response) => {
        this.orderSummaryFigures = response.data;
        this.mapFigureToChart();
      },
      error: (err: HttpErrorResponse) => {},
    });
  }
  mapFigureToChart() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue(
      '--text-color-secondary'
    );
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.data = {
      labels: [
        ...this.orderSummaryFigures.map((x) =>
          TimeUtil.formatShortDate(
            TimeUtil.convertUtcTimeToLocalTime(x.time.toString())
          )
        ),
      ],
      datasets: [
        {
          label: 'Gross Sales',
          fill: false,
          borderColor: documentStyle.getPropertyValue('--blue-500'),
          yAxisID: 'y',
          tension: 0.4,
          data: [...this.orderSummaryFigures.map((x) => x.totalAmount)],
        },
        {
          label: 'Sold Tickets',
          fill: false,
          borderColor: documentStyle.getPropertyValue('--green-500'),
          yAxisID: 'y1',
          tension: 0.4,
          data: [...this.orderSummaryFigures.map((x) => x.totalTicketSold)],
        },
      ],
    };

    this.options = {
      stacked: false,
      maintainAspectRatio: false,
      aspectRatio: 0.6,
      plugins: {
        legend: {
          labels: {
            color: textColor,
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
          },
        },
        y: {
          type: 'linear',
          display: true,
          position: 'left',
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
          },
        },
        y1: {
          type: 'linear',
          display: true,
          position: 'right',
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            drawOnChartArea: false,
            color: surfaceBorder,
          },
        },
      },
    };
  }
}
