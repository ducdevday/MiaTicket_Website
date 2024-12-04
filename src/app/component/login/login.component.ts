import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';

import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import {
  EMAIL_VERIFY_PATH,
  HOME_PATH,
  ORGANIZER_PATH,
  REGISTER_PATH,
} from '../../app.routes';
import { EMAIL_PATTERN, PASSWORD_PATTERN } from '../../const/regex';
import { VerifyType } from '../../dto/enum/verify-type';
import { LoginRequest } from '../../dto/request/login-request';
import { AccountService } from '../../service/account.service';
import { LocalStorageService } from '../../service/local-storage.service';
import { ToastService } from '../../service/toast.service';
import { VerifyCodeService } from '../../service/verify-code.service';
import SendVerifyCodeRequest from '../../dto/request/send-verify-code-request';
import { Role } from '../../dto/enum/role';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ToastModule,
    HttpClientModule,
    ButtonModule,
    DialogModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  providers: [
    ToastService,
    MessageService,
    AccountService,
    VerifyCodeService,
    LocalStorageService,
  ],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  forgotPasswordForm!: FormGroup;
  isShowForgotPassDialog: boolean = false;
  constructor(
    private fb: FormBuilder,
    private toastService: ToastService,
    private accountService: AccountService,
    private verifyCodeService: VerifyCodeService,
    private localStorageService: LocalStorageService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(EMAIL_PATTERN)]],
      password: [
        '',
        [Validators.required, Validators.pattern(PASSWORD_PATTERN)],
      ],
    });
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(EMAIL_PATTERN)]],
    });
  }
  ngOnInit(): void {
    const isAuthenticated = this.localStorageService.getIsAuthenticated();
    if (isAuthenticated) this.router.navigate(['']);
  }

  onLogin() {
    var isEmailValid = this.loginForm.controls['email'].valid;
    var isPasswordValid = this.loginForm.controls['password'].valid;

    if (isEmailValid && isPasswordValid) {
      var email = this.loginForm.controls['email'].value;
      var password = this.loginForm.controls['password'].value;
      var loginRequest = new LoginRequest(email, password);
      this.accountService.login(loginRequest).subscribe({
        next: (response) => {
          this.toastService.showSuccess('Login Successfully');
          this.localStorageService.saveIsAuthenticated(true);
          this.localStorageService.saveUserId(response.data.userId);
          this.localStorageService.saveAccessToken(response.data.accessToken);
          this.localStorageService.saveRole(response.data.role);
          this.onHandleNavigate();
        },
        error: (err) => {
          this.toastService.showError(err.error.message);
          if (err.error.statusCode == 403) {
            setTimeout(() => {
              this.router.navigate([EMAIL_VERIFY_PATH], {
                queryParams: {
                  email: this.loginForm.controls['email'].value,
                  verifyType: `${VerifyType[VerifyType.Register]}`,
                },
              });
            }, 3000); //
          }
        },
      });
    } else this.toastService.showError('Invalid email or password');
  }

  onHandleNavigate() {
    console.log('onHandleNavigate');
    const path =
      this.localStorageService.getRole() == Role.Organizer
        ? ORGANIZER_PATH
        : HOME_PATH;
    const redirectUrl =
      this.route.snapshot.queryParamMap.get('redirectUrl') || path;
    this.router.navigate([redirectUrl]);
  }

  onForgotPassword() {
    var isEmailValid = this.forgotPasswordForm.controls['email'].valid;
    if (isEmailValid) {
      var email = this.forgotPasswordForm.controls['email'].value;
      var sendVerifyCodeRequest = new SendVerifyCodeRequest(
        email,
        VerifyType.ResetPassword
      );
      this.verifyCodeService.sendVerifyCode(sendVerifyCodeRequest).subscribe({
        next: (response) => {
          this.router.navigate([EMAIL_VERIFY_PATH], {
            queryParams: {
              email: email,
              verifyType: `${VerifyType[VerifyType.ResetPassword]}`,
            },
          });
        },
        error: (err) => {
          this.toastService.showError(err.error.message);
        },
      });
    } else this.toastService.showError('Invalid email');
  }

  showForgotPassDialog() {
    this.isShowForgotPassDialog = true;
  }

  onRegisterClicked() {
    this.router.navigate([REGISTER_PATH]);
  }
}
