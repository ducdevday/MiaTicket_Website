import { Component } from '@angular/core';
import { CalendarModule } from 'primeng/calendar';
import { ToastService } from '../../service/toast.service';
import { MessageService } from 'primeng/api';
import { AccountService } from '../../service/account.service';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {
  EMAIL_PATTERN,
  PASSWORD_PATTERN,
  PHONE_NUMBER_PATTERN,
} from '../../const/regex';
import { TimeUtil } from '../../utils/time-util';
import { CreateAccountRequest } from '../../dto/request/create-account-request';
import { Router } from '@angular/router';
import { EMAIL_VERIFY_PATH, LOGIN_PATH } from '../../app.routes';
import { VerifyType } from '../../dto/enum/verify-type';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CalendarModule, ToastModule, HttpClientModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  providers: [ToastService, MessageService, AccountService],
})
export class RegisterComponent {
  registerForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private toastService: ToastService,
    private accountService: AccountService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(255)]],
      email: ['', [Validators.required, Validators.pattern(EMAIL_PATTERN)]],
      password: [
        '',
        [Validators.required, Validators.pattern(PASSWORD_PATTERN)],
      ],
      phoneNumber: [
        '',
        [Validators.required, Validators.pattern(PHONE_NUMBER_PATTERN)],
      ],
      birthDate: ['', [Validators.required, this.pastDateValidator]],
      gender: [null, Validators.required],
    });
  }

  pastDateValidator(control: AbstractControl): ValidationErrors | null {
    const enteredDate = new Date(control.value);
    const today = new Date();
    if (enteredDate >= today) {
      return { pastDate: true };
    }

    return null;
  }

  onSubmit() {
    var isNameValid = this.registerForm.controls['name'].valid;
    var isEmailValid = this.registerForm.controls['email'].valid;
    var isPasswordValid = this.registerForm.controls['password'].valid;
    var isPhoneNumberValid = this.registerForm.controls['phoneNumber'].valid;
    var isBirthDateValid = this.registerForm.controls['birthDate'].valid;
    var isGenderValid = this.registerForm.controls['gender'].valid;
    if (
      isNameValid &&
      isEmailValid &&
      isPasswordValid &&
      isPhoneNumberValid &&
      isBirthDateValid &&
      isGenderValid
    ) {
      var name = this.registerForm.controls['name'].value;
      var email = this.registerForm.controls['email'].value;
      var password = this.registerForm.controls['password'].value;
      var phoneNumber = this.registerForm.controls['phoneNumber'].value;
      var birthDate = TimeUtil.convertToISOString(
        this.registerForm.controls['birthDate'].value
      );
      var gender = this.registerForm.controls['gender'].value;
      var createAccountRequest = new CreateAccountRequest(
        name,
        email,
        password,
        phoneNumber,
        birthDate,
        gender
      );
      this.accountService.createAccount(createAccountRequest).subscribe({
        next: (response) => {
          console.log(response);
          this.toastService.showSuccess('Register Successfully');
          this.router.navigate([EMAIL_VERIFY_PATH], {
            queryParams: {
              email: this.registerForm.controls['email'].value,
              verifyType: `${VerifyType[VerifyType.Register]}`,
            },
          });
        },
        error: (err) => {
          console.log(err);
          this.toastService.showError('Register Failed! Please try again');
        },
      });
    } else {
      this.toastService.showError('Register Failed! Please try again');
    }
  }

  onLoginClicked() {
    this.router.navigate([LOGIN_PATH]);
  }
}
