import { CommonModule, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';
import { CalendarModule } from 'primeng/calendar';
import { FileUploadModule } from 'primeng/fileupload';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ToastModule } from 'primeng/toast';
import { EMAIL_PATTERN, PHONE_NUMBER_PATTERN } from '../../const/regex';
import { Gender } from '../../dto/enum/gender';
import UpdateAccountRequest from '../../dto/request/update-account-request';
import { AccountService } from '../../service/account.service';
import { LocalStorageService } from '../../service/local-storage.service';
import { ToastService } from '../../service/toast.service';
import { TimeUtil } from '../../utils/time-util';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CalendarModule,
    AvatarModule,
    FileUploadModule,
    ReactiveFormsModule,
    RadioButtonModule,
    CommonModule,
    ToastModule,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
  providers: [
    ToastService,
    MessageService,
    AccountService,
    LocalStorageService,
    Location,
  ],
})
export class ProfileComponent implements OnInit {
  profileForm!: FormGroup;

  selectedFile: File | null = null;
  genderArray = Object.keys(Gender)
    .filter((key) => isNaN(Number(key))) // Filter out the numeric keys
    .map((key, index) => ({
      value: Gender[key as keyof typeof Gender],
      name: key,
    }));

  constructor(
    private fb: FormBuilder,
    private toastService: ToastService,
    private accountService: AccountService,
    private localStorageService: LocalStorageService,
    private location: Location
  ) {
    this.profileForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(255)]],
      email: ['', [Validators.required, Validators.pattern(EMAIL_PATTERN)]],
      phoneNumber: [
        '',
        [Validators.required, Validators.pattern(PHONE_NUMBER_PATTERN)],
      ],
      birthDate: ['', [Validators.required, this.pastDateValidator]],
      gender: [null, Validators.required],
      avatarUrl: ['', [Validators.required, Validators.maxLength(255)]],
    });
  }

  ngOnInit(): void {
    this.initData();
    this.profileForm.get('email')?.disable();
  }

  pastDateValidator(control: AbstractControl): ValidationErrors | null {
    const enteredDate = new Date(control.value);
    const today = new Date();
    if (enteredDate >= today) {
      return { pastDate: true };
    }

    return null;
  }

  initData() {
    this.accountService.getAccountInformation().subscribe({
      next: (response) => {
        var user = response.data;
        this.profileForm.controls['name'].setValue(user.name);
        this.profileForm.controls['email'].setValue(user.email);
        this.profileForm.controls['phoneNumber'].setValue(user.phoneNumber);
        this.profileForm.controls['birthDate'].setValue(
          new Date(user.birthDate)
        );
        this.profileForm.controls['gender'].setValue(user.gender);
        this.profileForm.controls['avatarUrl'].setValue(
          user.avatarUrl ?? '/img_avatar_default.jpg'
        );
      },
    });
  }

  onSubmit() {
    var isNameValid = this.profileForm.controls['name'].valid;
    var isPhoneNumberValid = this.profileForm.controls['phoneNumber'].valid;
    var isBirthDateValid = this.profileForm.controls['birthDate'].valid;
    var isGenderValid = this.profileForm.controls['gender'].valid;
    if (
      isNameValid &&
      isPhoneNumberValid &&
      isBirthDateValid &&
      isGenderValid
    ) {
      var userId = this.localStorageService.getUserId();
      var name = this.profileForm.controls['name'].value;
      var phone = this.profileForm.controls['phoneNumber'].value;
      var birthDate = TimeUtil.formatToISOString(
        this.profileForm.controls['birthDate'].value
      );
      var gender = this.profileForm.controls['gender'].value;
      var avatarFile = this.selectedFile;
      var updateAccountRequest = new UpdateAccountRequest(
        name,
        phone,
        birthDate,
        gender,
        avatarFile
      );
      if (userId)
        this.accountService
          .updateAccount(userId, updateAccountRequest)
          .subscribe({
            next: (response) => {
              this.toastService.showSuccess(response.message);
            },
            error: (err) => {
              this.toastService.showError(err?.message);
            },
          });
    } else {
      this.toastService.showError('Invalid Input Field');
    }
  }

  onFileSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      this.selectedFile = fileInput.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        const img = reader.result as string;
        this.profileForm.controls['avatarUrl'].setValue(img);
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }
}
