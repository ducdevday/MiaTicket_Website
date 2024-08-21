import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputOtpModule } from 'primeng/inputotp';
@Component({
  selector: 'app-email-verify',
  standalone: true,
  imports: [FormsModule, InputOtpModule, ButtonModule],
  templateUrl: './email-verify.component.html',
  styleUrl: './email-verify.component.scss',
})
export class EmailVerifyComponent {
  value: any;
}
