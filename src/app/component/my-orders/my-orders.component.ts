import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { PaginatorModule } from 'primeng/paginator';
import { TabMenuModule } from 'primeng/tabmenu';
import { EmptyComponent } from '../../common/empty/empty.component';
import { OrderStatus } from '../../dto/enum/order-status';
import PaginationModel from '../../dto/model/pagination-model';
import { OrderService } from '../../service/order.service';
import { TimeUtil } from '../../utils/time-util';
import MyOrderModel from '../../dto/model/my-order-model';
import GetMyOrdersRequest from '../../dto/request/get-my-orders-request';
import { PageState } from '../../dto/enum/page-state';
import OrderTicketDetailModel from '../../dto/model/order-ticket-detail-model';
import CurrencyUtil from '../../utils/currency-util';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ORDERS_PATH } from '../../app.routes';
import { ToastService } from '../../service/toast.service';
import { ConfirmService } from '../../service/confirm.service';

@Component({
  selector: 'app-my-orders',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    ButtonModule,
    TabMenuModule,
    EmptyComponent,
    PaginatorModule,
  ],
  templateUrl: './my-orders.component.html',
  styleUrl: './my-orders.component.scss',
})
export class MyOrdersComponent {
  orderStatuses: MenuItem[] = [];
  activeOrderStatus: MenuItem | undefined;

  PAGE_INDEX: number = 1;
  PAGE_SIZE: number = 3;
  pagination!: PaginationModel;
  searchForm: FormGroup;

  myOrders: MyOrderModel[] = [];

  pageState: PageState = PageState.Init;
  constructor(
    private fb: FormBuilder,
    private orderService: OrderService,
    private toastService: ToastService,
    private confirmService: ConfirmService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.searchForm = this.fb.group({
      keyword: [''],
    });
  }

  ngOnInit(): void {
    this.orderStatuses = [
      {
        label: OrderStatus[OrderStatus.Pending],
        icon: 'pi pi-spinner-dotted',
        value: OrderStatus.Pending,
      },
      {
        label: OrderStatus[OrderStatus.Finished],
        icon: 'pi pi-check-circle',
        value: OrderStatus.Finished,
      },
      {
        label: OrderStatus[OrderStatus.Canceled],
        icon: 'pi pi-minus-circle',
        value: OrderStatus.Canceled,
      },
    ];
    this.activeOrderStatus = this.orderStatuses[0];
    this.pagination = new PaginationModel(
      this.PAGE_INDEX,
      this.PAGE_SIZE,
      0,
      0
    );
    this.fetchOrderData();
  }

  fetchOrderData() {
    const { keyword }: { keyword: string } = this.searchForm.value;
    console.log(keyword);
    const orderStatus = this.activeOrderStatus?.['value'];
    var request = new GetMyOrdersRequest(
      keyword,
      orderStatus,
      this.pagination.currentPageIndex,
      this.pagination.currentPageSize
    );
    this.pageState = PageState.Loading;
    this.orderService.getMyOrders(request).subscribe({
      next: (response) => {
        this.myOrders = response.data;
        this.pagination.totalRecords = response.totalRecords;
        this.pageState = PageState.Success;
      },
      error: (err) => {
        this.pageState = PageState.Error;
      },
    });
  }

  formatDateRage(date1: Date, date2: Date) {
    return TimeUtil.formatDateTimeRange(
      TimeUtil.convertUtcTimeToLocalTime(date1.toString()),
      TimeUtil.convertUtcTimeToLocalTime(date2.toString())
    );
  }

  formatOrderTicketsInformation(orderTickets: OrderTicketDetailModel[]) {
    return orderTickets
      .map((ot) => this.formatOrderTicketInformation(ot))
      .join(', ');
  }

  formatCurrency(price: number) {
    return CurrencyUtil.formatCurrency(price);
  }

  formatOrderTicketInformation(orderTicket: OrderTicketDetailModel) {
    return `${orderTicket.quantity}x ${orderTicket.name}`;
  }

  orderDateTimeFormatted(input: string): string {
    const dateTime = TimeUtil.convertUtcTimeToLocalTime(input);
    const result = TimeUtil.formatLongDateTime(dateTime);
    return result;
  }

  onActiveOrderStatusChange(orderStatus: MenuItem) {
    if (this.activeOrderStatus != orderStatus) {
      this.activeOrderStatus = orderStatus;
      this.fetchOrderData();
    }
  }

  onPageChange(event: any) {
    this.pagination.currentPageIndex = event.page + 1;
    this.fetchOrderData();
  }

  onSearch() {
    if (this.searchForm.valid) {
      this.pagination.currentPageIndex = this.PAGE_INDEX;
      this.fetchOrderData();
    }
  }

  onSeeDetail(orderId: number) {
    const path = ORDERS_PATH.replace(':orderId', orderId.toString()); // Replace the parameter with the actual slug
    this.router.navigate([path]);
  }

  onRepayment(paymentUrl: string) {
    window.open(paymentUrl, '_blank');
  }

  onCancelOrder(event: Event, orderId: number) {
    this.confirmService.confirmCancel(event, () => {
      this.orderService.cancelOrder(orderId.toString()).subscribe({
        next: (response) => {
          this.toastService.showSuccess('Order Canceled Success');
          this.fetchOrderData();
        },
        error: (err) => {
          this.toastService.showError(
            'Order Canceled Failed. Please try again'
          );
        },
      });
    });
  }
}
