import { Routes } from '@angular/router';
import { EmailVerifyComponent } from './component/email-verify/email-verify.component';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { ChangePasswordComponent } from './component/change-password/change-password.component';
import { HomeComponent } from './component/home/home.component';
import { SearchComponent } from './component/search/search.component';
import { EventDetailComponent } from './component/event-detail/event-detail.component';
import { ProfileComponent } from './component/profile/profile.component';
import { NewPasswordComponent } from './component/new-password/new-password.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'email-verify', component: EmailVerifyComponent },
  { path: 'change-password', component: ChangePasswordComponent },
  { path: 'search', component: SearchComponent },
  { path: 'events', component: EventDetailComponent },
  { path: 'account/profile', component: ProfileComponent },
  { path: 'account/change-password', component: NewPasswordComponent },
];
