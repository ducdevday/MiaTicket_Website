import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ProcessingService } from '../../service/processing.service';

@Component({
  selector: 'app-processing',
  standalone: true,
  imports: [CommonModule, ProgressSpinnerModule],
  templateUrl: './processing.component.html',
  styleUrl: './processing.component.scss',
})
export class ProcessingComponent {
  isVisible = false;

  constructor(private processingService: ProcessingService) {}

  ngOnInit(): void {
    this.processingService.isVisible$.subscribe((isVisible) => {
      this.isVisible = isVisible;
      if (this.isVisible) {
        // document.body.style.overflow = 'hidden';
      } else {
        // document.body.style.overflow = '';
      }
    });
  }
}
