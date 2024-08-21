import { Component } from '@angular/core';
import { MenuLayoutComponent } from '../../common/menu-layout/menu-layout.component';
import { ButtonModule } from 'primeng/button';
@Component({
  selector: 'app-new-password',
  standalone: true,
  imports: [MenuLayoutComponent, ButtonModule],
  templateUrl: './new-password.component.html',
  styleUrl: './new-password.component.scss',
})
export class NewPasswordComponent {}
