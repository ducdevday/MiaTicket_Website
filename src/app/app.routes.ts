import { Routes } from '@angular/router';
import { EmailVerifyComponent } from './component/email-verify/email-verify.component';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { ResetPasswordComponent } from './component/reset-password/reset-password.component';
import { HomeComponent } from './component/home/home.component';
import { EventDetailComponent } from './component/event-detail/event-detail.component';
import { ProfileComponent } from './component/profile/profile.component';
import { ChangePasswordComponent } from './component/change-password/change-password.component';
import { MyEventsComponent } from './component/my-events/my-events.component';
import { CreateEventComponent } from './component/create-event/create-event.component';
import { AuthGuardService } from './service/auth-guard.service';
import { AccountComponent } from './component/account/account.component';
import { EmailVerifyFinishComponent } from './component/email-verify-finish/email-verify-finish.component';
import { SearchEventComponent } from './component/search-event/search-event.component';
import { BookingComponent } from './component/booking/booking.component';
import { PaymentComponent } from './component/payment/payment.component';
import { PaymentInformationComponent } from './component/payment-information/payment-information.component';
import { MyOrdersComponent } from './component/my-orders/my-orders.component';
import { OrderDetailComponent } from './component/order-detail/order-detail.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { VoucherComponent } from './component/voucher/voucher.component';

export const HOME_PATH: string = '';
export const LOGIN_PATH: string = 'login';
export const REGISTER_PATH: string = 'register';
export const EMAIL_VERIFY_PATH: string = 'email-verify';
export const EMAIL_VERIFY_FINISH_PATH: string = 'email-verify-finish';
export const RESET_PASSWORD_PATH: string = 'reset-password';
export const SEARCH_PATH: string = 'search';
export const EVENTS_PATH: string = 'events/:eventSlug';
export const BOOKING_PATH: string = 'events/:eventId/booking/:showTimeId';
// export const BOOKING_PATH: string = 'booking';
export const PAYMENT_PATH: string = 'payment';
export const PAYMENT_INFORMATION_PATH: string = 'payment-information';
export const PROFILE_PATH: string = 'account/profile';
export const CHANGE_PASSWORD_PATH: string = 'account/change-password';
export const MY_ORDERS_PATH: string = 'account/my-orders';
export const MY_EVENTS_PATH: string = 'account/my-events';
export const CREATE_EVENTS_PATH: string = 'account/create-event';
export const ORDERS_PATH: string = 'orders/:orderId';
export const VOUCHERS_PATH: string = 'events/:eventId/vouchers';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: HOME_PATH, component: HomeComponent, pathMatch: 'full' },
    ],
  },
  {
    path: LOGIN_PATH,
    component: LoginComponent,
    data: { showHeader: false, showFooter: false },
  },
  {
    path: REGISTER_PATH,
    component: RegisterComponent,

    data: { showHeader: false, showFooter: false },
  },
  {
    path: EMAIL_VERIFY_PATH,
    component: EmailVerifyComponent,

    data: { showHeader: false, showFooter: false },
  },
  {
    path: EMAIL_VERIFY_FINISH_PATH,
    component: EmailVerifyFinishComponent,
    data: { showHeader: false, showFooter: false },
  },
  {
    path: RESET_PASSWORD_PATH,
    component: ResetPasswordComponent,
    data: { showHeader: false, showFooter: false },
  },

  {
    path: SEARCH_PATH,
    component: SearchEventComponent,
  },
  {
    path: EVENTS_PATH,
    component: EventDetailComponent,
  },

  {
    path: BOOKING_PATH,
    component: BookingComponent,
    data: { showSearchBar: false, showFooter: false },
  },
  {
    path: PAYMENT_PATH,
    component: PaymentComponent,
    canActivate: [AuthGuardService],
    data: { showSearchBar: false, showFooter: false },
  },
  {
    path: PAYMENT_INFORMATION_PATH,
    component: PaymentInformationComponent,
    canActivate: [AuthGuardService],
    data: { showSearchBar: false, showFooter: false },
  },
  {
    path: ORDERS_PATH,
    component: OrderDetailComponent,
  },
  {
    path: VOUCHERS_PATH,
    component: VoucherComponent,
  },
  {
    path: '',
    component: AccountComponent,
    canActivate: [AuthGuardService],

    children: [
      {
        path: PROFILE_PATH,
        component: ProfileComponent,
        canActivate: [AuthGuardService],
      },
      {
        path: CHANGE_PASSWORD_PATH,
        component: ChangePasswordComponent,
        canActivate: [AuthGuardService],
      },
      {
        path: MY_ORDERS_PATH,
        component: MyOrdersComponent,
        canActivate: [AuthGuardService],
      },
      {
        path: MY_EVENTS_PATH,
        component: MyEventsComponent,
        canActivate: [AuthGuardService],
      },
      {
        path: CREATE_EVENTS_PATH,
        component: CreateEventComponent,
        canActivate: [AuthGuardService],
      },
    ],
  },
  { path: '**', component: HomeComponent },
];
