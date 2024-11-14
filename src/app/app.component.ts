import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { ProcessingComponent } from './common/processing/processing.component';
import { ConfirmService } from './service/confirm.service';
import { ProcessingService } from './service/processing.service';
import { ToastService } from './service/toast.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
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
