import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.scss',
})
export class NotFoundComponent {
  constructor(private router: Router, private location: Location) {}
  goBack(): void {
    this.location.back(); // Navigate to the previous page
  }

  goToHome(): void {
    this.router.navigate(['/']); // Navigate to the home page
  }
}
