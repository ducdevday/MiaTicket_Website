import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../common/header/header.component';
import { FooterComponent } from '../../common/footer/footer.component';
import { EventService } from '../../service/event.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BOOKING_PATH, SEARCH_PATH } from '../../app.routes';
import { CategoryService } from '../../service/category.service';
import CategoryModel from '../../dto/model/category-model';
import { CommonModule } from '@angular/common';
import { AccordionModule } from 'primeng/accordion';
import EventDetailModel from '../../dto/model/event-detail-model';
import { ProcessingService } from '../../service/processing.service';
import { TimeUtil } from '../../utils/time-util';
import ShowTimeDetailDto from '../../dto/model/show-time-detail-dto';
import { NotFoundComponent } from '../../common/not-found/not-found.component';
import { PageState } from '../../dto/enum/page-state';
import CurrencyUtil from '../../utils/currency-util';
import { LocalStorageService } from '../../service/local-storage.service';
@Component({
  selector: 'app-event-detail',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    FooterComponent,
    AccordionModule,
    NotFoundComponent,
  ],
  templateUrl: './event-detail.component.html',
  styleUrl: './event-detail.component.scss',
})
export class EventDetailComponent implements OnInit {
  categories: CategoryModel[] = [];
  eventId!: string;
  eventDetail!: EventDetailModel;
  pageState: PageState = PageState.Init;
  constructor(
    private eventService: EventService,
    private categoryService: CategoryService,
    private processService: ProcessingService,
    private localStorageService: LocalStorageService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.fetchCategoriesData();
    this.eventId = this.getEventId();
    this.fetchEventDetail();
  }

  fetchCategoriesData() {
    this.categoryService.getCategoriesDiscovery().subscribe({
      next: (response) => {
        this.categories = response.data;
      },
    });
  }

  fetchEventDetail() {
    this.processService.show();
    this.eventService.getEventDetail(this.eventId).subscribe({
      next: (response) => {
        this.eventDetail = response.data;
        this.processService.hide();
        this.pageState = PageState.Success;
      },
      error: (_) => {
        this.processService.hide();
        this.pageState = PageState.Error;
      },
    });
  }

  isPageSuccess() {
    return this.pageState == PageState.Success;
  }

  isPageError() {
    return this.pageState == PageState.Error;
  }

  getEventId() {
    const slug = this.route.snapshot.params['eventSlug'];
    const slugParts = slug.split('-');
    const id = slugParts[slugParts.length - 1];
    return id;
  }

  onCategoryPressed(categoryId: number) {
    this.router.navigate([SEARCH_PATH], {
      queryParams: { categories: categoryId },
    });
  }

  formatTimeRange(date1: Date, date2: Date) {
    return TimeUtil.formatDateTimeRange(
      TimeUtil.convertUtcTimeToLocalTime(date1.toString()),
      TimeUtil.convertUtcTimeToLocalTime(date2.toString())
    );
  }

  formatPrice(price: number) {
    return CurrencyUtil.formatCurrency(price);
  }

  isCanBuyNow(showTime: ShowTimeDetailDto): boolean {
    const currentTime = new Date();
    const saleStartAt = TimeUtil.convertUtcTimeToLocalTime(
      showTime.saleStartAt.toString()
    );
    const saleEndDate = TimeUtil.convertUtcTimeToLocalTime(
      showTime.saleEndAt.toString()
    );

    if (currentTime < saleStartAt) {
      return false;
    }

    if (currentTime > saleEndDate) {
      return false;
    }

    if (showTime.tickets.every((x) => x.isAvailable == false)) {
      return false;
    }
    return true;
  }

  buyNowName(showTime: ShowTimeDetailDto): string {
    const currentTime = new Date();
    const saleStartAt = TimeUtil.convertUtcTimeToLocalTime(
      showTime.saleStartAt.toString()
    );
    const saleEndDate = TimeUtil.convertUtcTimeToLocalTime(
      showTime.saleEndAt.toString()
    );
    if (currentTime < saleStartAt) {
      return 'Not In Sale Time';
    }
    if (currentTime > saleEndDate) {
      return 'Over Sale Time';
    }

    if (showTime.tickets.every((x) => x.isAvailable == false)) {
      return 'Sold Out';
    }
    return 'Buy now';
  }

  buyNowButtonPressed(showTime: ShowTimeDetailDto) {
    if (!this.isCanBuyNow(showTime)) return;

    this.router.navigate([
      BOOKING_PATH.replace(':eventId', this.eventId).replace(
        ':showTimeId',
        showTime.id.toString()
      ),
    ]);
  }
}
