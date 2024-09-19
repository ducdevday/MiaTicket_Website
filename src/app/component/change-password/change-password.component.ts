import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { PASSWORD_PATTERN } from '../../const/regex';
import ChangePasswordRequest from '../../dto/request/change-password-request';
import { AccountService } from '../../service/account.service';
import { ToastService } from '../../service/toast.service';
import { LocalStorageService } from '../../service/local-storage.service';
import { UserModel } from '../../dto/model/user-model';
import { CHANGE_PASSWORD_PATH } from '../../app.routes';
import { Location } from '@angular/common';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [ButtonModule, ReactiveFormsModule, ToastModule],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss',
  providers: [
    ToastService,
    MessageService,
    AccountService,
    LocalStorageService,
    Location,
  ],
})
export class ChangePasswordComponent implements OnInit {
  changePasswordForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private toastService: ToastService,
    private accountService: AccountService,
    private localStorageService: LocalStorageService,
    private location: Location
  ) {
    this.changePasswordForm = this.fb.group({
      currentPassword: [
        '',
        [Validators.required, Validators.pattern(PASSWORD_PATTERN)],
      ],
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

  ngOnInit(): void {
    // this.location.replaceState(CHANGE_PASSWORD_PATH);
  }

  onSubmit() {
    var isCurrentPasswordValid =
      this.changePasswordForm.controls['currentPassword'].valid;
    var isNewPasswordValid =
      this.changePasswordForm.controls['newPassword'].valid;
    var isConfirmPasswordValid =
      this.changePasswordForm.controls['confirmPassword'].valid;
    if (
      isCurrentPasswordValid &&
      isNewPasswordValid &&
      isConfirmPasswordValid
    ) {
      var currentPassword =
        this.changePasswordForm.controls['currentPassword'].value;
      var newPassword = this.changePasswordForm.controls['newPassword'].value;
      var confirmPassword =
        this.changePasswordForm.controls['confirmPassword'].value;

      var userId = this.localStorageService.getUserId();
      if (userId) {
        var changePasswordRequest = new ChangePasswordRequest(
          userId,
          currentPassword,
          newPassword,
          confirmPassword
        );
        this.accountService.changePassword(changePasswordRequest).subscribe({
          next: (response) => {
            this.toastService.showSuccess('Change Password Successfully');
          },
          error: (err) => {
            this.toastService.showError('Change Password Failure');
          },
        });
      }
    } else {
      this.toastService.showError('Invalid Input');
    }
  }
}
