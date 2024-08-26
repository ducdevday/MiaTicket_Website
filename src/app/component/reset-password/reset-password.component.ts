import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ToastModule } from 'primeng/toast';
import { LOGIN_PATH } from '../../app.routes';
import { PASSWORD_PATTERN } from '../../const/regex';
import { VerifyType } from '../../dto/enum/verify-type';
import ResetPasswordRequest from '../../dto/request/reset-password-request';
import UseVerifyCodeRequest from '../../dto/request/use-verify-code-request';
import { AccountService } from '../../service/account.service';
import { CountdownService } from '../../service/countdown.service';
import { ToastService } from '../../service/toast.service';
import { VerifyCodeService } from '../../service/verify-code.service';

enum ResetPasswordState {
  VerifyProcessing = 0,
  VerifyFinished,
  ResetPasswordFinished,
}
@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [
    ToastModule,
    CommonModule,
    ProgressSpinnerModule,
    ButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss',
  providers: [
    ToastService,
    MessageService,
    AccountService,
    Router,
    CountdownService,
  ],
})
export class ResetPasswordComponent implements OnInit {
  state = ResetPasswordState.ResetPasswordFinished;
  email!: string;
  code!: string;
  timeLeft: number = 5;

  resetPasswordForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private toastService: ToastService,
    private accountService: AccountService,
    private verifyCodeService: VerifyCodeService,
    private countdownService: CountdownService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.email = params['email'];
      this.code = params['code'];
      var useVerifyCodeRequest = new UseVerifyCodeRequest(
        this.email,
        this.code,
        VerifyType.ResetPassword
      );
      this.verifyCodeService.useVerifyCode(useVerifyCodeRequest).subscribe({
        next: (response) => {
          this.state = ResetPasswordState.VerifyFinished;
        },
        error: (err) => {
          this.toastService.showError(err.error.message);
          this.state = ResetPasswordState.ResetPasswordFinished;
          this.startCountdown(5);
        },
      });
    });
    this.resetPasswordForm = this.fb.group({
      newPassword: [
        '',
        [Validators.required, Validators.pattern(PASSWORD_PATTERN)],
      ],
      confirmPassword: [
        '',
        [Validators.required, Validators.pattern(PASSWORD_PATTERN)],
      ],
    });
  }

  onSubmit() {
    var isNewPasswordValid =
      this.resetPasswordForm.controls['newPassword'].valid;
    var isConfirmPasswordValid =
      this.resetPasswordForm.controls['confirmPassword'].valid;
    var newPassword = this.resetPasswordForm.controls['newPassword'].value;
    var confirmPassword =
      this.resetPasswordForm.controls['confirmPassword'].value;
    if (
      isNewPasswordValid &&
      isConfirmPasswordValid &&
      newPassword == confirmPassword
    ) {
      var resetPasswordRequest = new ResetPasswordRequest(
        this.email,
        this.code,
        newPassword,
        confirmPassword
      );
      this.accountService.resetPassword(resetPasswordRequest).subscribe({
        next: (response) => {
          this.toastService.showSuccess('Reset Password Successfully');
          this.startCountdown(5);
          this.state = ResetPasswordState.ResetPasswordFinished;
        },
        error: (err) => {
          this.toastService.showError(err.error.message);
        },
      });
    } else {
      this.toastService.showError('Invalid Field');
    }
  }

  onGoToLoginPageClicked() {
    this.router.navigate([LOGIN_PATH]);
  }
  startCountdown(seconds: number): void {
    this.countdownService.startCountdown(seconds).subscribe((timeLeft) => {
      this.timeLeft = timeLeft;
      if (timeLeft == 0) {
        this.onGoToLoginPageClicked();
      }
    });
  }
}
