import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CarouselModule } from 'primeng/carousel';
import { TagModule } from 'primeng/tag';
import { FooterComponent } from '../../common/footer/footer.component';
import { HeaderComponent } from '../../common/header/header.component';
import { ProcessingComponent } from '../../common/processing/processing.component';
import BannerModel from '../../dto/model/banner-model';
import ByCategoryEventModel from '../../dto/model/by-category-event-model';
import CategoryModel from '../../dto/model/category-model';
import LatestEventModel from '../../dto/model/latest-event-model';
import TrendingEventModel from '../../dto/model/trending-event-model';
import GetByCategoryEventsRequest from '../../dto/request/get-by-category-events-request';
import GetLatestEventsRequest from '../../dto/request/get-latest-events-request';
import GetTrendingEventsRequest from '../../dto/request/get-trending-events-request';
import { BannerService } from '../../service/banner.service';
import { CategoryService } from '../../service/category.service';
import { EventService } from '../../service/event.service';
import { TimeUtil } from '../../utils/time-util';
import { Router } from '@angular/router';
import { EVENTS_PATH, SEARCH_PATH } from '../../app.routes';
import { SkeletonModule } from 'primeng/skeleton';
import { forkJoin, map } from 'rxjs';
import { ProcessingService } from '../../service/processing.service';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    CarouselModule,
    ButtonModule,
    TagModule,
    FooterComponent,
    HeaderComponent,
    ProcessingComponent,
    SkeletonModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  providers: [BannerService, EventService],
})
export class HomeComponent implements OnInit {
  responsiveOptions: any[] | undefined;

  categories: CategoryModel[] = [];
  banners: BannerModel[] = [];
  latestEvents: LatestEventModel[] = [];
  trendingEvents: TrendingEventModel[] = [];
  musicEvents: ByCategoryEventModel[] = [];
  theatersAndArtEvents: ByCategoryEventModel[] = [];
  othersEvents: ByCategoryEventModel[] = [];

  NUM_OF_LATEST_EVENT: number = 12;
  NUM_OF_TRENDING_EVENT: number = 12;
  NUM_OF_BY_CATE_EVENT: number = 4;
  constructor(
    private categoryService: CategoryService,
    private bannerService: BannerService,
    private eventService: EventService,
    private processingService: ProcessingService,
    private router: Router
  ) {}

  ngOnInit() {
    this.responsiveOptions = [
      {
        breakpoint: '991px',
        numVisible: 2,
        numScroll: 1,
      },
      {
        breakpoint: '767px',
        numVisible: 1,
        numScroll: 1,
      },
    ];
    this.processingService.show();
    forkJoin({
      categories: this.fetchCategoriesData(),
      banners: this.fetchBannersData(),
      latestEvents: this.fetchLatestEventsData(),
      trendingEvents: this.fetchTrendingEventsData(),
    }).subscribe({
      next: ({ categories, banners, latestEvents, trendingEvents }) => {
        this.categories = categories;
        this.banners = banners;
        this.latestEvents = latestEvents;
        this.trendingEvents = trendingEvents;

        this.fetchByCategoriesEvents(
          this.categories[0].id,
          (data) => (this.musicEvents = data)
        );
        this.fetchByCategoriesEvents(
          this.categories[1].id,
          (data) => (this.theatersAndArtEvents = data)
        );
        this.fetchByCategoriesEvents(
          this.categories[3].id,
          (data) => (this.othersEvents = data)
        );
        this.processingService.hide();
      },
      error: (err) => {
        this.processingService.hide();
      },
    });
  }

  fetchCategoriesData() {
    return this.categoryService
      .getCategoriesDiscovery()
      .pipe(map((response) => Array.from(response.data)));
  }

  fetchBannersData() {
    return this.bannerService
      .getBannersDiscovery()
      .pipe(map((response) => Array.from(response.data)));
  }

  fetchLatestEventsData() {
    const getLatestEventsRequest = new GetLatestEventsRequest(
      this.NUM_OF_LATEST_EVENT
    );
    return this.eventService
      .getGetLatestEvents(getLatestEventsRequest)
      .pipe(map((response) => Array.from(response.data)));
  }

  fetchTrendingEventsData() {
    const getTrendingEventsRequest = new GetTrendingEventsRequest(
      this.NUM_OF_TRENDING_EVENT
    );
    return this.eventService
      .getTrendingEvents(getTrendingEventsRequest)
      .pipe(map((response) => Array.from(response.data)));
  }

  fetchByCategoriesEvents(
    categoryId: number,
    callback: (events: ByCategoryEventModel[]) => void
  ): void {
    const request = new GetByCategoryEventsRequest(
      categoryId,
      this.NUM_OF_BY_CATE_EVENT
    );
    this.eventService.getByCategoryEvents(request).subscribe({
      next: (response) => {
        callback(response.data);
      },
      error: () => {
        callback([]);
      },
    });
  }

  @ViewChild('sliderLatestEvents', { static: false })
  sliderLatestEvents!: ElementRef;
  goPrevLatestEvent(): void {
    const itemWidth = this.sliderLatestEvents.nativeElement.clientWidth / 5;
    const gap = 4;
    this.sliderLatestEvents.nativeElement.scrollBy({
      left: -(itemWidth + gap),
      behavior: 'smooth',
    });
  }

  goNextLatestEvent(): void {
    const itemWidth = this.sliderLatestEvents.nativeElement.clientWidth / 5;
    const gap = 4;
    this.sliderLatestEvents.nativeElement.scrollBy({
      left: itemWidth + gap,
      behavior: 'smooth',
    });
  }

  @ViewChild('sliderTrendingEvents', { static: false })
  sliderTrendingEvents!: ElementRef;
  goPrevTrendingEvent(): void {
    const itemWidth = this.sliderTrendingEvents.nativeElement.clientWidth / 4;
    const gap = 8;
    this.sliderTrendingEvents.nativeElement.scrollBy({
      left: -(itemWidth + gap),
      behavior: 'smooth',
    });
  }

  goNextTrendingEvent(): void {
    const itemWidth = this.sliderTrendingEvents.nativeElement.clientWidth / 4;
    const gap = 8;
    this.sliderTrendingEvents.nativeElement.scrollBy({
      left: itemWidth + gap,
      behavior: 'smooth',
    });
  }

  formatEventDate(input: any): string {
    const date = TimeUtil.convertUtcTimeToLocalTime(input);
    return TimeUtil.formatHomeDateTime(date);
  }

  formatEventPrice(price: number): string {
    return TimeUtil.formatCurrency(price);
  }

  onCategoryPressed(categoryId: number) {
    this.router.navigate([SEARCH_PATH], {
      queryParams: { categories: categoryId },
    });
  }

  onEventPressed(slug: string) {
    const path = EVENTS_PATH.replace(':eventSlug', slug); // Replace the parameter with the actual slug
    this.router.navigate([path]);
  }
}
