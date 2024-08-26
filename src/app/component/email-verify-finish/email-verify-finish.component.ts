import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../service/account.service';
import { ActivatedRoute, Router } from '@angular/router';
import ActivateAccountRequest from '../../dto/request/activate-account-request';
import { ToastService } from '../../service/toast.service';
import { MessageService } from 'primeng/api';
import { CountdownService } from '../../service/countdown.service';
import { LOGIN_PATH } from '../../app.routes';
import { ToastModule } from 'primeng/toast';
import { CommonModule } from '@angular/common';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ButtonModule } from 'primeng/button';
@Component({
  selector: 'app-email-verify-finish',
  standalone: true,
  imports: [ToastModule, CommonModule, ProgressSpinnerModule, ButtonModule],
  templateUrl: './email-verify-finish.component.html',
  styleUrl: './email-verify-finish.component.scss',
  providers: [
    ToastService,
    MessageService,
    AccountService,
    Router,
    CountdownService,
  ],
})
export class EmailVerifyFinishComponent implements OnInit {
  isFinished = false;
  email!: string;
  code!: string;
  timeLeft: number = 5;
  constructor(
    private toastService: ToastService,
    private accountService: AccountService,
    private countdownService: CountdownService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.email = params['email'];
      this.code = params['code'];
      var activateAccountRequest = new ActivateAccountRequest(
        this.email,
        this.code
      );
      this.accountService.activateAccount(activateAccountRequest).subscribe({
        next: (response) => {
          this.isFinished = true;
          this.startCountdown(5);
        },
        error: (err) => {
          this.toastService.showError(err?.message);
          this.isFinished = true;
          this.startCountdown(5);
        },
      });
    });
  }

  startCountdown(seconds: number): void {
    this.countdownService.startCountdown(seconds).subscribe((timeLeft) => {
      this.timeLeft = timeLeft;
      if (timeLeft == 0) {
        this.onGoToLoginPageClicked();
      }
    });
  }

  onGoToLoginPageClicked() {
    this.router.navigate([LOGIN_PATH]);
  }
}
