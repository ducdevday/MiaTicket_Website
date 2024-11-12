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
import { DropdownModule } from 'primeng/dropdown';
import { Gender } from '../../dto/enum/gender';
import { Role } from '../../dto/enum/role';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CalendarModule,
    ToastModule,
    HttpClientModule,
    DropdownModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  providers: [ToastService, MessageService, AccountService],
})
export class RegisterComponent {
  genders = [
    {
      name: 'Male',
      value: Gender.Male,
    },
    {
      name: 'Female',
      value: Gender.Female,
    },
    {
      name: 'Other',
      value: Gender.Other,
    },
  ];

  roles = [
    {
      name: 'Customer',
      value: Role.Customer,
    },
    {
      name: 'Organizer',
      value: Role.Organizer,
    },
  ];

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
      confirmPassword: [
        '',
        [Validators.required, Validators.pattern(PASSWORD_PATTERN)],
      ],
      phoneNumber: [
        '',
        [Validators.required, Validators.pattern(PHONE_NUMBER_PATTERN)],
      ],
      birthDate: ['', [Validators.required, this.pastDateValidator]],
      gender: [null, Validators.required],
      role: [null, Validators.required],
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
    const isRegisterFormValid = this.registerForm.valid;
    if (isRegisterFormValid) {
      const {
        name,
        email,
        password,
        confirmPassword,
        phoneNumber,
        birthDate,
        gender,
        role,
      } = this.registerForm.value;

      var createAccountRequest = new CreateAccountRequest(
        name,
        email,
        password,
        confirmPassword,
        phoneNumber,
        birthDate,
        gender.value,
        role.value
      );
      this.accountService.createAccount(createAccountRequest).subscribe({
        next: (response) => {
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
