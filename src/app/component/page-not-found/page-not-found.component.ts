import { Component } from '@angular/core';
import { NotFoundComponent } from '../../common/not-found/not-found.component';
import { FooterComponent } from '../../common/footer/footer.component';

@Component({
  selector: 'app-page-not-found',
  standalone: true,
  imports: [NotFoundComponent, FooterComponent],
  templateUrl: './page-not-found.component.html',
  styleUrl: './page-not-found.component.scss',
})
export class PageNotFoundComponent {}
