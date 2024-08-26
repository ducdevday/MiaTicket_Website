import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputOtpModule } from 'primeng/inputotp';
import { ToastService } from '../../service/toast.service';
import { MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { VerifyCodeService } from '../../service/verify-code.service';
import { LocalStorageService } from '../../service/local-storage.service';
import { ToastModule } from 'primeng/toast';
import { VerifyType } from '../../dto/enum/verify-type';
import SendVerifyCodeRequest from '../../dto/request/send-verify-code-request';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-email-verify',
  standalone: true,
  imports: [
    FormsModule,
    InputOtpModule,
    ButtonModule,
    ToastModule,
    CommonModule,
  ],
  templateUrl: './email-verify.component.html',
  styleUrl: './email-verify.component.scss',
  providers: [ToastService, MessageService, Router, VerifyCodeService],
})
export class EmailVerifyComponent implements OnInit {
  value: any;
  email!: string;
  verifyType!: string;
  constructor(
    private toastService: ToastService,
    private route: ActivatedRoute,
    private verifyCodeService: VerifyCodeService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.email = params['email'];
      this.verifyType = params['verifyType'];
    });
  }

  onOpenMailClick() {
    const emailDomain = this.email.split('@')[1].toLowerCase();
    let providerUrl: string;

    switch (emailDomain) {
      case 'gmail.com':
        providerUrl = 'https://mail.google.com/';
        break;
      case 'yahoo.com':
        providerUrl = 'https://mail.yahoo.com/';
        break;
      case 'outlook.com':
      case 'hotmail.com':
        providerUrl = 'https://outlook.live.com/';
        break;
      case 'icloud.com':
        providerUrl = 'https://www.icloud.com/mail';
        break;
      case 'yandex.com':
        providerUrl = 'https://mail.yandex.com/';
        break;
      case 'zoho.com':
        providerUrl = 'https://mail.zoho.com/';
        break;
      default:
        alert('Something went wrong');
        return;
    }
    window.open(providerUrl, '_blank');
  }

  onResendClicked() {
    var type = this.stringToEnumValue(VerifyType, this.verifyType);
    if (this.email != null && type != null) {
      var resendVerifyCodeRequest = new SendVerifyCodeRequest(this.email, type);
      this.verifyCodeService.sendVerifyCode(resendVerifyCodeRequest).subscribe({
        next: (response) => {
          this.toastService.showSuccess(response.message);
        },
        error: (err) => {
          console.log(err);
          this.toastService.showSuccess('Resend Failed! Please try again');
        },
      });
    } else {
      this.toastService.showError('Something went wrong');
    }
  }

  stringToEnumValue(enumType: any, value: string): number | null {
    const enumKey = Object.keys(enumType).find((key) => key === value);
    if (enumKey) {
      return enumType[enumKey];
    }
    return null;
  }
}
