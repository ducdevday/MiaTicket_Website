import {
  Component,
  EventEmitter,
  Output,
  Input,
  OnChanges,
  SimpleChanges,
  OnInit,
} from '@angular/core';
import VoucherModel from '../../../dto/model/voucher-model';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ToastService } from '../../../service/toast.service';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { VoucherType } from '../../../dto/enum/voucher-type';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { VoucherService } from '../../../service/voucher.service';
import CreateVoucherRequest from '../../../dto/request/create-voucher-request';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { TimeUtil } from '../../../utils/time-util';
import UpdateVoucherRequest from '../../../dto/request/update-voucher-request';

@Component({
  selector: 'app-create-voucher',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    DialogModule,
    DropdownModule,
    InputTextModule,
    CalendarModule,
  ],
  templateUrl: './create-voucher.component.html',
  styleUrl: './create-voucher.component.scss',
})
export class CreateVoucherComponent implements OnInit, OnChanges {
  @Input() isCreateVoucherFormVisible: boolean = false;
  @Output() isCreateVoucherFormVisibleChange = new EventEmitter<boolean>();

  @Input() voucherInput?: VoucherModel;
  @Output() voucherCreateOutput = new EventEmitter<void>();
  @Output() voucherEditOutput = new EventEmitter<void>();

  voucherForm!: FormGroup;
  voucherTypes = [
    {
      name: 'Fix Amount',
      value: VoucherType.FixedAmount,
    },
    {
      name: 'Percentage',
      value: VoucherType.Percentage,
    },
  ];
  eventId!: number;
  constructor(
    private fb: FormBuilder,
    private toastService: ToastService,
    private voucherService: VoucherService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.voucherForm = this.fb.group({
      voucherName: ['', [Validators.required, Validators.maxLength(50)]],
      voucherCode: ['', [Validators.required, Validators.maxLength(12)]],
      voucherValue: [null, [Validators.required]],
      voucherType: [null, [Validators.required]],
      voucherQuantity: [null],
      voucherMinimumQuantityPerOrder: [null],
      voucherMaximumQuantityPerOrder: [null],
      voucherStartDate: [null, [Validators.required]],
      voucherEndDate: [null, [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.getEventIdParams();
  }

  getEventIdParams() {
    this.eventId = this.route.snapshot.params['eventId'];
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.voucherInput) {
      this.voucherForm.patchValue({
        voucherName: this.voucherInput.name,
        voucherCode: this.voucherInput.code,
        voucherValue: this.voucherInput.value,
        voucherType: this.voucherTypes.find(
          (x) => x.value == this.voucherInput?.type
        ),
        voucherQuantity: this.voucherInput.initQuantity,
        voucherMinimumQuantityPerOrder: this.voucherInput.minQuantityPerOrder,
        voucherMaximumQuantityPerOrder: this.voucherInput.maxQuantityPerOrder,
        voucherStartDate: new Date(
          TimeUtil.convertUtcTimeToLocalTime(
            this.voucherInput.startDate.toString()
          )
        ),
        voucherEndDate: new Date(
          TimeUtil.convertUtcTimeToLocalTime(
            this.voucherInput.endDate.toString()
          )
        ),
      });
    } else {
      this.voucherForm.reset();
    }
  }

  onFormClose() {
    this.isCreateVoucherFormVisibleChange.emit(false);
    this.voucherForm.reset();
  }

  onSaveButtonPressed() {
    const isVoucherFormValid = this.voucherForm.valid;
    const {
      voucherName,
      voucherCode,
      voucherValue,
      voucherType,
      voucherQuantity,
      voucherMinimumQuantityPerOrder,
      voucherMaximumQuantityPerOrder,
      voucherStartDate,
      voucherEndDate,
    } = this.voucherForm.value;

    if (
      !isVoucherFormValid ||
      voucherStartDate > voucherEndDate ||
      voucherValue.Value < 0 ||
      (voucherQuantity != null && voucherQuantity <= 0) ||
      (voucherMinimumQuantityPerOrder != null &&
        voucherMinimumQuantityPerOrder <= 0) ||
      (voucherMaximumQuantityPerOrder != null &&
        voucherMaximumQuantityPerOrder <= 0) ||
      (voucherMinimumQuantityPerOrder != null &&
        voucherMaximumQuantityPerOrder != null &&
        voucherMaximumQuantityPerOrder < voucherMinimumQuantityPerOrder)
    ) {
      return this.toastService.showError('Invalid Fields');
    }
    if (!this.voucherInput) {
      const createVoucherRequest = new CreateVoucherRequest(
        voucherName,
        voucherCode,
        voucherStartDate,
        voucherEndDate,
        this.eventId,
        voucherValue,
        voucherType.value,
        voucherQuantity,
        voucherMinimumQuantityPerOrder,
        voucherMaximumQuantityPerOrder
      );
      this.voucherService.createVoucher(createVoucherRequest).subscribe({
        next: (response) => {
          this.toastService.showSuccess('Create Voucher Success');
          this.voucherCreateOutput.emit();
          this.onFormClose();
        },
        error: (err: HttpErrorResponse) => {
          this.toastService.showError(err.error.message);
        },
      });
    } else {
      const updateVoucherRequest = new UpdateVoucherRequest(
        voucherName,
        voucherCode,
        voucherStartDate,
        voucherEndDate,
        this.eventId,
        voucherValue,
        voucherType.value,
        voucherQuantity,
        voucherMinimumQuantityPerOrder,
        voucherMaximumQuantityPerOrder
      );
      this.voucherService
        .updateVoucher(this.voucherInput.id, updateVoucherRequest)
        .subscribe({
          next: (response) => {
            this.toastService.showSuccess('Update Voucher Success');
            this.voucherEditOutput.emit();
            this.onFormClose();
          },
          error: (err: HttpErrorResponse) => {
            this.toastService.showError(err.error.message);
          },
        });
    }
  }
}
