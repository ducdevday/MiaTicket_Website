import { Component, ViewEncapsulation } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';

import { ToastService } from '../../service/toast.service';
import { AccountService } from '../../service/account.service';
import { LoginRequest } from '../../dto/request/login-request';
import { HttpClientModule } from '@angular/common/http';
import { EMAIL_PATTERN, PASSWORD_PATTERN } from '../../const/regex';

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
  providers: [ToastService, MessageService, AccountService],
})
export class LoginComponent {
  loginForm!: FormGroup;
  isShowForgotPassDialog: boolean = false;
  constructor(
    private fb: FormBuilder,
    private toastService: ToastService,
    private accountService: AccountService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(EMAIL_PATTERN)]],
      password: [
        '',
        [Validators.required, Validators.pattern(PASSWORD_PATTERN)],
      ],
    });
  }

  onSubmit() {
    var isEmailValid = this.loginForm.controls['email'].valid;
    var isPasswordValid = this.loginForm.controls['password'].valid;

    if (isEmailValid && isPasswordValid) {
      var email = this.loginForm.controls['email'].value;
      var password = this.loginForm.controls['password'].value;
      var loginRequest = new LoginRequest(email, password);
      this.accountService.login(loginRequest).subscribe({
        next: (response) => {
          console.log(response);
          this.toastService.showSuccess('Login Successfully');
        },
        error: (err) => {
          console.log(err);
          this.toastService.showError('Invalid email or password');
        },
      });
    } else
      this.toastService.showError('Login failed, invalid email or password');
  }

  showForgotPassDialog() {
    console.log('showForgotPassDialog');

    this.isShowForgotPassDialog = true;
  }
}
