import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import VoucherModel from '../../dto/model/voucher-model';
import { TableModule } from 'primeng/table';
import { ConfirmService } from '../../service/confirm.service';
import { CreateTicketComponent } from '../create-event/create-ticket/create-ticket.component';
import { CreateVoucherComponent } from './create-voucher/create-voucher.component';
import { VoucherService } from '../../service/voucher.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { VoucherType } from '../../dto/enum/voucher-type';
import CurrencyUtil from '../../utils/currency-util';
import { TimeUtil } from '../../utils/time-util';
import { ToastService } from '../../service/toast.service';
import { EmptyComponent } from '../../common/empty/empty.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-voucher',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    ButtonModule,
    TableModule,
    CreateVoucherComponent,
    EmptyComponent,
  ],
  templateUrl: './voucher.component.html',
  styleUrl: './voucher.component.scss',
})
export class VoucherComponent implements OnInit {
  vouchers: VoucherModel[] = [];
  eventId!: number;
  eventName: string = '';
  isCreateVoucherFormVisible: boolean = false;
  selectedVoucher?: VoucherModel;

  searchForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private confirmService: ConfirmService,
    private voucherService: VoucherService,
    private toastService: ToastService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.searchForm = this.fb.group({
      keyword: [''],
    });
  }

  ngOnInit(): void {
    this.getEventIdParams();
    this.fetchMyVouchers();
  }

  getEventIdParams() {
    this.eventId = this.route.snapshot.params['eventId'] as number;
  }

  fetchMyVouchers() {
    const { keyword } = this.searchForm.value;
    this.voucherService.getMyVouchers(this.eventId, keyword).subscribe({
      next: (response) => {
        this.vouchers = response.data;
        this.eventName = response.eventName;
      },
      error: (err) => {},
    });
  }

  showCreateVoucherForm() {
    this.selectedVoucher = undefined;
    this.isCreateVoucherFormVisible = true;
  }

  showEditVoucherForm(voucher: VoucherModel) {
    this.selectedVoucher = voucher;
    this.isCreateVoucherFormVisible = true;
  }

  showDeleteVoucherConfirmDialog(event: Event, voucher: VoucherModel) {
    this.confirmService.confirmDelete(event, () => {
      this.onVoucherDelete(voucher.id);
    });
  }

  onSearchButtonPressed() {
    this.fetchMyVouchers();
  }

  onVoucherCreate() {
    this.fetchMyVouchers();
  }

  onVoucherDelete(voucherId: number) {
    this.voucherService.deleteVoucher(voucherId).subscribe({
      next: (response) => {
        this.toastService.showSuccess('Delete Voucher Success');
        this.fetchMyVouchers();
      },
      error: (err) => {
        this.toastService.showError('Delete Voucher Error, Please try again');
      },
    });
  }

  onVoucherEdit() {
    this.fetchMyVouchers();
  }

  voucherValueString(value: number, voucherType: VoucherType) {
    switch (voucherType) {
      case VoucherType.Percentage:
        return `${value}%`;
      case VoucherType.FixedAmount:
        return `${CurrencyUtil.formatCurrency(value)}`;
    }
  }

  formatTimeRange(date1: Date, date2: Date) {
    return TimeUtil.formatDateTimeRange(
      TimeUtil.convertUtcTimeToLocalTime(date1.toString()),
      TimeUtil.convertUtcTimeToLocalTime(date2.toString())
    );
  }
}
