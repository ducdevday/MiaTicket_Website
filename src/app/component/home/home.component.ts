import { Component, OnInit } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CarouselModule, ButtonModule, TagModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  sliderSpecialEvents: any;
  defaultTransformSpecialEvent: any;
  sliderTrendingEvents: any;
  defaultTransformTrendingEvent: any;
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
  }
}
