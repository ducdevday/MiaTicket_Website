import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../common/header/header.component';
import { FooterComponent } from '../../common/footer/footer.component';
import { EventService } from '../../service/event.service';
import { Router } from '@angular/router';
import { SEARCH_PATH } from '../../app.routes';
import { CategoryService } from '../../service/category.service';
import CategoryModel from '../../dto/model/category-model';
import { CommonModule } from '@angular/common';
import { AccordionModule } from 'primeng/accordion';
@Component({
  selector: 'app-event-detail',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent, AccordionModule],
  templateUrl: './event-detail.component.html',
  styleUrl: './event-detail.component.scss',
})
export class EventDetailComponent implements OnInit {
  categories: CategoryModel[] = [];

  constructor(
    private eventService: EventService,
    private categoryService: CategoryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchCategoriesData();
  }

  fetchCategoriesData() {
    this.categoryService.getCategoriesDiscovery().subscribe({
      next: (response) => {
        this.categories = response.data;
      },
    });
  }

  onCategoryPressed(categoryId: number) {
    this.router.navigate([SEARCH_PATH], {
      queryParams: { categories: categoryId },
    });
  }
}
