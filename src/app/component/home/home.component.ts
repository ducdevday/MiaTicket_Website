import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CarouselModule } from 'primeng/carousel';
import { TagModule } from 'primeng/tag';
import { FooterComponent } from '../../common/footer/footer.component';
import { HeaderComponent } from '../../common/header/header.component';

interface City {
  name: string;
  image: string;
}

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
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  cities!: City[];
  responsiveOptions: any[] | undefined;
  withSpecialEventItem = 0;
  sliderSpecialEvents: any;
  defaultTransformSpecialEvent: any;
  sliderTrendingEvents: any;
  defaultTransformTrendingEvent: any;
  selectedCity!: City;

  goNextSpecialEvent() {
    this.defaultTransformSpecialEvent = this.defaultTransformSpecialEvent - 398;
    if (
      Math.abs(this.defaultTransformSpecialEvent) >=
      this.sliderSpecialEvents.scrollWidth / 1.7
    )
      this.defaultTransformSpecialEvent = 0;
    this.sliderSpecialEvents.style.transform =
      'translateX(' + this.defaultTransformSpecialEvent + 'px)';
  }
  goPrevSpecialEvent() {
    if (Math.abs(this.defaultTransformSpecialEvent) === 0)
      this.defaultTransformSpecialEvent = 0;
    else
      this.defaultTransformSpecialEvent =
        this.defaultTransformSpecialEvent + 398;
    this.sliderSpecialEvents.style.transform =
      'translateX(' + this.defaultTransformSpecialEvent + 'px)';
  }

  goNextTrendingEvent() {
    this.defaultTransformTrendingEvent =
      this.defaultTransformTrendingEvent - 398;
    if (
      Math.abs(this.defaultTransformTrendingEvent) >=
      this.sliderTrendingEvents.scrollWidth / 1.7
    )
      this.defaultTransformTrendingEvent = 0;
    this.sliderTrendingEvents.style.transform =
      'translateX(' + this.defaultTransformTrendingEvent + 'px)';
  }
  goPrevTrendingEvent() {
    if (Math.abs(this.defaultTransformTrendingEvent) === 0)
      this.defaultTransformTrendingEvent = 0;
    else
      this.defaultTransformTrendingEvent =
        this.defaultTransformTrendingEvent + 398;
    this.sliderTrendingEvents.style.transform =
      'translateX(' + this.defaultTransformTrendingEvent + 'px)';
  }
  constructor() {}

  ngOnInit() {
    this.sliderSpecialEvents = document.getElementById('sliderSpecialEvents');
    this.defaultTransformSpecialEvent = 0;
    this.sliderTrendingEvents = document.getElementById('sliderTrendingEvents');
    this.defaultTransformTrendingEvent = 0;

    this.cities = [
      { name: 'New York', image: 'bamboo-watch.jpg' },
      { name: 'Rome', image: 'bamboo-watch.jpg' },
      { name: 'London', image: 'bamboo-watch.jpg' },
      { name: 'Istanbul', image: 'bamboo-watch.jpg' },
      { name: 'Paris', image: 'bamboo-watch.jpg' },
    ];

    this.responsiveOptions = [
      {
        breakpoint: '1199px',
        numVisible: 1,
        numScroll: 1,
      },
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
  }
}
