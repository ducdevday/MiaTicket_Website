import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CarouselModule } from 'primeng/carousel';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { TagModule } from 'primeng/tag';
import { FooterComponent } from '../../common/footer/footer.component';
import { HeaderComponent } from '../../common/header/header.component';
import { ProcessingComponent } from '../../common/processing/processing.component';
import { EventSortType } from '../../dto/enum/event-sort-type';
import CategoryModel from '../../dto/model/category-model';
import PaginationModel from '../../dto/model/pagination-model';
import { CategoryService } from '../../service/category.service';
import { EventService } from '../../service/event.service';
import SearchEventRequest from '../../dto/request/search-event-request';
import SearchEventModel from '../../dto/model/search-event-model';
import { TimeUtil } from '../../utils/time-util';
import { EmptyComponent } from '../../common/empty/empty.component';
import CurrencyUtil from '../../utils/currency-util';

@Component({
  selector: 'app-search-event',
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
    OverlayPanelModule,
    EmptyComponent,
  ],
  templateUrl: './search-event.component.html',
  styleUrl: './search-event.component.scss',
  providers: [CategoryService, EventService],
})
export class SearchEventComponent implements OnInit {
  keyword: string | null = null;
  categories: CategoryModel[] = [];
  selectedCategories: CategoryModel[] = [];

  locations = [
    { name: 'All', value: '' },
    { name: 'Ho Chi Minh City', value: 'Thành phố Hồ Chí Minh' },
    { name: 'Ha Noi City', value: 'Thành phố Hà Nội' },
    { name: 'Da Nang City', value: 'Thành phố Đà Nẵng' },
  ];
  selectedLocation = '';

  sortTypes = Object.values(EventSortType).filter((e) => typeof e !== 'string');
  sortBy: EventSortType | null = null;

  minPrice: number | null = null;
  maxPrice: number | null = null;
  currentMinPrice: number | null = null;
  currentMaxPrice: number | null = null;

  INIT_PAGE_INDEX = 1;
  INIT_PAGE_SIZE = 8;
  pagination!: PaginationModel;

  searchEvents: SearchEventModel[] = [];
  isProcessing: boolean = false;
  isCanShowMore: boolean = true;
  constructor(
    private categoryService: CategoryService,
    private eventService: EventService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.fetchCategoriesData();
    this.pagination = new PaginationModel(
      this.INIT_PAGE_INDEX,
      this.INIT_PAGE_SIZE,
      0,
      0
    );
  }

  fetchCategoriesData() {
    this.categoryService.getCategoriesDiscovery().subscribe({
      next: (response) => {
        this.categories = response.data;

        this.route.queryParams.subscribe((params) => {
          this.getQueryParams(params);
        });
      },
    });
  }

  isCateSelected(category: CategoryModel): boolean {
    return this.selectedCategories.includes(category);
  }

  toggleCategory(category: CategoryModel) {
    const index = this.selectedCategories.indexOf(category);
    if (index === -1) {
      this.selectedCategories.push(category);
    } else {
      this.selectedCategories.splice(index, 1);
    }
    this.setQueryParams({
      categories: this.selectedCategories.map((x) => x.id).join(','),
    });
  }

  selectLocation(value: string) {
    this.selectedLocation = value;
    this.setQueryParams({ location: this.selectedLocation || null });
  }

  selectSortType(sortType: EventSortType) {
    this.sortBy = sortType;
    this.setQueryParams({ sortBy: this.sortBy });
  }

  nameOfSortType(sortType: EventSortType): string {
    switch (sortType) {
      case EventSortType.Latest:
        return 'Latest';
      case EventSortType.PriceLowToHigh:
        return 'Low to High Price';
      case EventSortType.PriceHighToLow:
        return 'High to Low Price';
      default:
        return '';
    }
  }

  resetPriceRange() {
    this.minPrice = null;
    this.maxPrice = null;
    this.setQueryParams({
      priceRanges: null,
    });
  }

  applyPriceRange() {
    if (
      this.minPrice !== null &&
      this.maxPrice !== null &&
      this.minPrice <= this.maxPrice
    ) {
      this.setQueryParams({ priceRanges: `${this.minPrice}-${this.maxPrice}` });
    } else {
      this.resetPriceRange();
    }
  }

  getQueryParams(params: any) {
    this.keyword = params.keyword || '';

    const categoryIds = params.categories ? params.categories.split(',') : [];
    this.selectedCategories = this.categories.filter((category) =>
      categoryIds.includes(`${category.id}`)
    );

    this.selectedLocation = params.location || '';

    this.sortBy = params.sortBy ? (+params.sortBy as EventSortType) : null;

    if (params.priceRanges) {
      const [minPrice, maxPrice] = params.priceRanges.split('-').map(Number);
      this.minPrice = minPrice || null;
      this.maxPrice = maxPrice || null;
      this.currentMinPrice = minPrice || null;
      this.currentMaxPrice = maxPrice || null;
    } else {
      this.minPrice = null;
      this.maxPrice = null;
      this.currentMinPrice = null;
      this.currentMaxPrice = null;
    }

    this.fetchSearchEventData(params, true);
  }

  onShowMoreEvents() {
    this.pagination.currentPageIndex++;
    const params = this.route.snapshot.queryParams;
    this.fetchSearchEventData(params, false);
  }

  // Combine event loading logic
  fetchSearchEventData(params: any, isClearCurrentSearchEvents: boolean) {
    const searchEventRequest = new SearchEventRequest(
      this.pagination.currentPageIndex,
      this.pagination.currentPageSize,
      params.keyword,
      params.location,
      params.categories,
      params.priceRanges,
      params.sortBy as EventSortType
    );
    this.isProcessing = true;
    this.eventService.searchEvent(searchEventRequest).subscribe({
      next: (response) => {
        if (response.data.length === 0) {
          this.isCanShowMore = false;
        } else {
          if (isClearCurrentSearchEvents) {
            this.searchEvents = response.data;
          } else {
            this.searchEvents = [...this.searchEvents, ...response.data];
          }
        }
        this.isProcessing = false;
      },
      error: (err) => {
        this.isProcessing = false;
      },
    });
  }

  setQueryParams(params: any) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: params,
      queryParamsHandling: 'merge',
    });
  }

  locationStringValue(): string {
    return this.selectedLocation != ''
      ? `${this.selectedLocation}`
      : 'Location';
  }

  categoriesStringValue(): string {
    return this.selectedCategories.length > 0
      ? this.selectedCategories.map((category) => category.name).join(',')
      : 'Category';
  }

  pricesRangesName(): string {
    return this.currentMinPrice != null && this.currentMaxPrice != null
      ? `${this.formatEventPrice(this.currentMinPrice)}-${this.formatEventPrice(
          this.currentMaxPrice
        )}`
      : 'Price';
  }

  sortByName(): string {
    return this.sortBy != null ? `${EventSortType[this.sortBy]}` : 'Sort By';
  }

  formatEventDate(input: any): string {
    const date = TimeUtil.convertUtcTimeToLocalTime(input);

    return TimeUtil.formatHomeDateTime(date);
  }

  formatEventPrice(price: number): string {
    return CurrencyUtil.formatCurrency(price);
  }
}
