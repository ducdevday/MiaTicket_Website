import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  RouterOutlet,
  RouterLink,
  RouterLinkActive,
  RouterModule,
} from '@angular/router';
import { ToastService } from './service/toast.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmService } from './service/confirm.service';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    RouterModule,
    ToastModule,
    ConfirmDialogModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [
    ToastService,
    MessageService,
    ConfirmService,
    ConfirmationService,
  ],
})
export class AppComponent {
  title = 'MiaTicket.UI';
}
