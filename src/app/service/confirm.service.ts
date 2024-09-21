import { Injectable } from '@angular/core';
import { ConfirmationService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class ConfirmService {
  constructor(private confirmationService: ConfirmationService) {}

  confirmInfo(
    event: Event,
    message: string,
    onAccept: () => void,
    onReject?: () => void
  ) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: message,
      header: 'Confirmation',
      icon: 'pi pi-info',
      acceptIcon: 'none',
      rejectIcon: 'none',
      acceptButtonStyleClass: 'p-button-contrast p-button-text',
      rejectButtonStyleClass: 'p-button-secondary p-button-text',
      accept: () => {
        onAccept();
      },
      reject: () => {
        onReject?.();
      },
    });
  }

  confirmDelete(event: Event, onAccept: () => void, onReject?: () => void) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: 'p-button-danger p-button-text',
      rejectButtonStyleClass: 'p-button-text p-button-text',
      acceptIcon: 'none',
      rejectIcon: 'none',

      accept: () => {
        onAccept(); // Call the onAccept callback
      },
      reject: () => {
        onReject?.();
      },
    });
  }

  confirmCancel(event: Event, onAccept: () => void, onReject?: () => void) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Do you want to cancel this order?',
      header: 'Cancel Confirmation',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: 'p-button-danger p-button-text',
      rejectButtonStyleClass: 'p-button-text p-button-text',
      acceptIcon: 'none',
      rejectIcon: 'none',

      accept: () => {
        onAccept(); // Call the onAccept callback
      },
      reject: () => {
        onReject?.();
      },
    });
  }
}
