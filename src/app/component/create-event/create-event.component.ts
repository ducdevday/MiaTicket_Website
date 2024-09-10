import { CommonModule, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { EditorModule } from 'primeng/editor';
import { SidebarModule } from 'primeng/sidebar';
import { StepsModule } from 'primeng/steps';
import { TableModule } from 'primeng/table';
import { MenuLayoutComponent } from '../../common/menu-layout/menu-layout.component';
import { VnAddressService } from '../../service/vn-address.service';
import { ToastService } from '../../service/toast.service';
import GetListProvinceResponse from '../../dto/response/get-list-province-response';
import { HttpErrorResponse } from '@angular/common/http';
import ProvinceModel from '../../dto/model/province-model';
import DistrictModel from '../../dto/model/district-model';
import WardModel from '../../dto/model/ward-model';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CategoryService } from '../../service/category.service';
import CategoryModel from '../../dto/model/category-model';
import ShowTimeModel from '../../dto/model/show-time-model';
import { CreateShowTimeComponent } from './create-show-time/create-show-time.component';
import { ToastModule } from 'primeng/toast';
import { TimeUtil } from '../../utils/time-util';
import { EmptyComponent } from '../../common/empty/empty.component';
import { ConfirmService } from '../../service/confirm.service';
import CreateEventRequest from '../../dto/request/create-event-request';
import { LocalStorageService } from '../../service/local-storage.service';
import { EventService } from '../../service/event.service';
import CreateEventResponse from '../../dto/response/create-event-response';
import { ProcessingService } from '../../service/processing.service';
import { Router } from '@angular/router';
import { MY_EVENTS_PATH } from '../../app.routes';
@Component({
  selector: 'app-create-event',
  standalone: true,
  imports: [
    MenuLayoutComponent,
    StepsModule,
    CommonModule,
    DropdownModule,
    EditorModule,
    ButtonModule,
    TableModule,
    DialogModule,
    SidebarModule,
    CalendarModule,
    ReactiveFormsModule,
    CreateShowTimeComponent,
    EmptyComponent,
  ],
  templateUrl: './create-event.component.html',
  styleUrl: './create-event.component.scss',
  providers: [
    Location,
    VnAddressService,
    CategoryService,
    EventService,
    LocalStorageService,
  ],
})
export class CreateEventComponent implements OnInit {
  steps: any[] = [];

  activeIndex: number = 0;

  isCreateShowTimeFormVisible = false;
  isShowAddTicket = false;

  createForm!: FormGroup;
  showTimes: ShowTimeModel[] = [];

  provinces: ProvinceModel[] = [];
  districts: DistrictModel[] = [];
  wards: WardModel[] = [];
  categories: CategoryModel[] = [];
  selectedShowTime?: ShowTimeModel;
  selectedShowTimeIndex: number = -1;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastService: ToastService,
    private confirmService: ConfirmService,
    private location: Location,
    private addressService: VnAddressService,
    private categoryService: CategoryService,
    private eventService: EventService,
    private localStorageService: LocalStorageService,
    private processingService: ProcessingService
  ) {
    this.createForm = this.fb.group({
      eventLogoFile: [null, [Validators.required]],
      eventLogoUrl: [
        'https://ticketbox.vn/_next/image?url=https%3A%2F%2Fimages.tkbcdn.com%2F2%2F360%2F479%2Fts%2Fds%2F06%2F3b%2Fae%2F8e9dc0929ccdeb4f4d29a2b77d5237c3.jpg&w=1920&q=75',
        [Validators.required],
      ],
      eventBackgroundFile: [null, [Validators.required]],
      eventBackgroundUrl: [
        'https://salt.tkbcdn.com/ts/ds/27/d3/b5/2aaaa1e0caa963462c6f395bd1bbb9d3.jpg',
        [Validators.required],
      ],
      eventName: ['', [Validators.required, Validators.maxLength(255)]],
      isEventOffline: [true, [Validators.required]],
      addressName: [''],
      addressProvince: [null],
      addressDistrict: [null],
      addressWard: [null],
      addressNo: [''],
      category: [null, [Validators.required]],
      eventDescription: ['', [Validators.required]],
      organizerName: ['', [Validators.required]],
      organizerInformation: ['', [Validators.required]],
      organizerLogoFile: [null, [Validators.required]],
      organizerLogoUrl: [
        'https://salt.tkbcdn.com/ts/ds/34/0f/8e/9079e3642f2683ce448dcce5ae07b111.png',
        [Validators.required],
      ],
      paymentAccount: ['', [Validators.required]],
      paymentNumber: ['', [Validators.required]],
      paymentBankName: ['', [Validators.required]],
      paymentBankBranch: ['', [Validators.required]],
    });
  }
  onActiveIndexChange(index: number) {
    this.activeIndex = index;
  }

  ngOnInit() {
    // this.location.replaceState(CREATE_EVENTS_PATH);
    this.fetchProvincesData();
    this.fetchCategoriesData();
    this.steps = [
      {
        index: 0,
        label: 'Event Information',
        step: 'infor',
      },
      {
        index: 1,
        label: 'Show Time & Ticket',
        step: 'showing',
      },
      {
        index: 0,
        label: 'Payment',
        step: 'payment',
      },
    ];

    // Subscribe to value changes
    this.createForm
      .get('addressProvince')
      ?.valueChanges.subscribe((selectedProvince: ProvinceModel | null) => {
        console.log(selectedProvince);
        if (selectedProvince) {
          this.fetchDistrictsData(selectedProvince.province_id);
        }
      });

    this.createForm
      .get('addressDistrict')
      ?.valueChanges.subscribe((selectedDistrict: DistrictModel | null) => {
        if (selectedDistrict) {
          this.fetchWardsData(selectedDistrict.district_id);
        }
      });
  }

  fetchProvincesData() {
    this.addressService.getListProvince().subscribe({
      next: (response) => {
        this.provinces = response.data;
      },
      error: (err: HttpErrorResponse) => {
        console.log(err.error);
      },
    });
  }

  fetchDistrictsData(provinceId: string) {
    this.addressService.getListDistrict(provinceId).subscribe({
      next: (response) => {
        this.districts = response.data;
      },
      error: (err: HttpErrorResponse) => {
        console.log(err.error);
      },
    });
  }

  fetchWardsData(districtId: string) {
    this.addressService.getListWard(districtId).subscribe({
      next: (response) => {
        this.wards = response.data;
      },
      error: (err: HttpErrorResponse) => {
        console.log(err.error);
      },
    });
  }

  fetchCategoriesData() {
    this.categoryService.getCategoriesDiscovery().subscribe({
      next: (response) => {
        this.categories = response.data;
      },
      error: (err: HttpErrorResponse) => {
        console.log(err.error);
      },
    });
  }

  onCreateShowTime(showTime: ShowTimeModel) {
    this.showTimes.push(showTime);
  }

  onEditShowTime(showTime: ShowTimeModel) {
    if (this.selectedShowTimeIndex !== -1) {
      this.showTimes[this.selectedShowTimeIndex] = showTime; // Update the ticket at the stored index
    }
  }

  onDeleteShowTime(index: number) {
    this.showTimes.splice(index, 1);
  }

  showCreateShowTimeForm() {
    this.selectedShowTime = undefined;
    this.selectedShowTimeIndex = -1;
    this.isCreateShowTimeFormVisible = true;
  }

  showEditShowTimeForm(index: number) {
    this.selectedShowTime = this.showTimes[index];
    this.selectedShowTimeIndex = index;
    this.isCreateShowTimeFormVisible = true;
  }

  showDeleteShowTimeConfirmDialog(event: Event, index: number) {
    this.confirmService.confirmDelete(event, () => {
      this.onDeleteShowTime(index);
    });
  }

  onEventLogoFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.createForm.controls['eventLogoUrl'].setValue(e.target?.result);
      };
      reader.readAsDataURL(file);

      this.createForm.patchValue({
        eventLogoFile: file,
      });
    }
  }

  onEventBackgroundFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.createForm.controls['eventBackgroundUrl'].setValue(
          e.target?.result
        );
      };
      reader.readAsDataURL(file);

      this.createForm.patchValue({
        eventBackgroundFile: file,
      });
    }
  }

  onOrganizerFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.createForm.controls['organizerLogoUrl'].setValue(e.target?.result);
      };
      reader.readAsDataURL(file);

      this.createForm.patchValue({
        organizerLogoFile: file,
      });
    }
  }

  onSaveEvent(event: Event) {
    this.onSubmit(event);
  }
  onContinue(event: Event) {
    if (this.activeIndex < this.steps.length - 1) {
      this.onActiveIndexChange(++this.activeIndex);
    } else {
      this.onSubmit(event);
    }
  }

  onSubmit(event: Event) {
    if (this.createForm.valid) {
      var {
        eventLogoFile,
        eventBackgroundFile,
        eventName,
        isEventOffline,
        addressName,
        addressProvince,
        addressDistrict,
        addressWard,
        addressNo,
        category,
        eventDescription,
        organizerName,
        organizerInformation,
        organizerLogoFile,
        paymentAccount,
        paymentNumber,
        paymentBankName,
        paymentBankBranch,
      } = this.createForm.value;
      if (
        isEventOffline &&
        (addressName == '' ||
          addressProvince == null ||
          addressDistrict == null ||
          addressWard == null ||
          addressNo == '')
      ) {
        this.toastService.showError('Offline Event Must Have Address');
        return;
      }
      addressName = isEventOffline ? addressName : '';
      addressProvince = isEventOffline ? addressProvince.province_name : '';
      addressDistrict = isEventOffline ? addressDistrict.district_name : '';
      addressWard = isEventOffline ? addressWard.ward_name : '';
      addressNo = isEventOffline ? addressNo : '';

      var request = new CreateEventRequest(
        eventName,
        eventLogoFile,
        eventBackgroundFile,
        isEventOffline,
        addressName,
        addressProvince,
        addressDistrict,
        addressWard,
        addressNo,
        eventDescription,
        organizerName,
        organizerInformation,
        organizerLogoFile,
        paymentAccount,
        paymentNumber,
        paymentBankName,
        paymentBankBranch,
        category.id,
        this.localStorageService.getUser()?.id!,
        this.showTimes
      );
      this.confirmService.confirmInfo(
        event,
        'Are you sure to create this event',
        () => {
          this.processingService.show();
          this.eventService.createEvent(request).subscribe({
            next: (response: CreateEventResponse) => {
              this.toastService.showSuccess('Create Event Succeed');
              this.processingService.hide();
              this.router.navigate([MY_EVENTS_PATH]);
            },
            error: (err: HttpErrorResponse) => {
              this.toastService.showError('Create Event Failed');
              this.processingService.hide();
            },
          });
        }
      );
    } else {
      this.toastService.showError('Invalid Field');
    }
  }

  formatToShortDateString(date: Date): string {
    return TimeUtil.formatShortDateTime(date);
  }
}
