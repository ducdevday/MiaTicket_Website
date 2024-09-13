import { Component, Input } from '@angular/core';
import { HeaderComponent } from '../../common/header/header.component';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [HeaderComponent, ButtonModule],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.scss',
})
export class BookingComponent {
  @Input() title: string = 'no text';
}
