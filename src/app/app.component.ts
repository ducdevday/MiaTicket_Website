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
import { ProcessingService } from './service/processing.service';
import { ProcessingComponent } from './common/processing/processing.component';

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
    ProcessingComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [
    ToastService,
    MessageService,
    ConfirmService,
    ConfirmationService,
    ProcessingService,
  ],
})
export class AppComponent {
  title = 'MiaTicket.UI';
}
