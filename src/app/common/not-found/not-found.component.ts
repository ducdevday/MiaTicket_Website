import { CommonModule, Location } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.scss',
})
export class NotFoundComponent {
  @Input() isLightBackground: boolean = false;
  constructor(private router: Router, private location: Location) {}
  goBack(): void {
    this.location.back(); // Navigate to the previous page
  }

  goToHome(): void {
    this.router.navigate(['/']); // Navigate to the home page
  }
}
