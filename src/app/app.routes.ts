import { Routes } from '@angular/router';
import { EmailVerifyComponent } from './component/email-verify/email-verify.component';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { ChangePasswordComponent } from './component/change-password/change-password.component';
import { TravelComponent } from './component/travel/travel.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'email-verify', component: EmailVerifyComponent },
  { path: 'change-password', component: ChangePasswordComponent },
  { path: 'travel', component: TravelComponent }
];
