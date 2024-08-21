import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private messageService: MessageService) {}

  showSuccess(content: string) {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: content,
    });
  }

  showInfo(content: string) {
    this.messageService.add({
      severity: 'info',
      summary: 'Info',
      detail: content,
    });
  }

  showWarn(content: string) {
    this.messageService.add({
      severity: 'warn',
      summary: 'Warn',
      detail: content,
    });
  }

  showError(content: string) {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: content,
    });
  }
}
