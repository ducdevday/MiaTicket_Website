import { Component } from '@angular/core';
import { HeaderComponent } from '../../common/header/header.component';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss',
})
export class PaymentComponent {}
