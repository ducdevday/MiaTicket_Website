import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { EditorModule } from 'primeng/editor';
import { SidebarModule } from 'primeng/sidebar';
import { StepsModule } from 'primeng/steps';
import { TableModule } from 'primeng/table';
import { ToastService } from '../../../service/toast.service';
import { MessageService } from 'primeng/api';
import TicketModel from '../../../dto/model/ticket-model';
import { ToastModule } from 'primeng/toast';
@Component({
  selector: 'app-create-ticket',
  standalone: true,
  imports: [
    StepsModule,
    CommonModule,
    DropdownModule,
    EditorModule,
    ButtonModule,
    TableModule,
    DialogModule,
    SidebarModule,
    CalendarModule,
    ReactiveFormsModule,
  ],
  templateUrl: './create-ticket.component.html',
  styleUrl: './create-ticket.component.scss',
})
export class CreateTicketComponent implements OnChanges {
  @Input() isCreateTicketFormVisible: boolean = false;
  @Output() isCreateTicketFormVisibleChange = new EventEmitter<boolean>();

  @Input() ticketInput?: TicketModel;
  @Output() ticketCreateOutput = new EventEmitter<TicketModel>();
  @Output() ticketEditOutput = new EventEmitter<TicketModel>();
  createTicketForm!: FormGroup;
  constructor(private fb: FormBuilder, private toastService: ToastService) {
    this.createTicketForm = this.fb.group({
      ticketName: ['', [Validators.required, Validators.maxLength(50)]],
      ticketPrice: [null, [Validators.required]],
      ticketQuantity: [null, [Validators.required]],
      ticketMinimumPurchase: [null, [Validators.required]],
      ticketMaximumPurchase: [null, [Validators.required]],
      ticketDescription: ['', [Validators.maxLength(50)]],
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.ticketInput) {
      this.createTicketForm.patchValue({
        ticketName: this.ticketInput.name,
        ticketPrice: this.ticketInput.price,
        ticketQuantity: this.ticketInput.quantity,
        ticketMinimumPurchase: this.ticketInput.minimumPurchase,
        ticketMaximumPurchase: this.ticketInput.maximumPurchase,
        ticketDescription: this.ticketInput.description,
      });
    }
  }

  onFormClose() {
    this.isCreateTicketFormVisibleChange.emit(false);
    this.createTicketForm.reset();
    this.ticketInput = undefined;
  }

  onSubmit() {
    if (this.createTicketForm.valid) {
      const {
        ticketName,
        ticketPrice,
        ticketQuantity,
        ticketMinimumPurchase,
        ticketMaximumPurchase,
        ticketDescription,
      } = this.createTicketForm.value;

      if (ticketPrice < 0) {
        return this.toastService.showError(
          'Price must be equal or greater than zero'
        );
      }

      if (ticketQuantity < 1) {
        return this.toastService.showError(
          'Total number of tickets must be greater than zero'
        );
      }

      if (ticketMinimumPurchase < 1) {
        return this.toastService.showError(
          'Minimum number of tickets for one purchase must be greater than zero'
        );
      }

      if (ticketMaximumPurchase < ticketMinimumPurchase) {
        return this.toastService.showError(
          'Maximum number of tickets must be equal or greater than Minimum number of tickets for one purchase'
        );
      }

      if (ticketMaximumPurchase > ticketQuantity) {
        return this.toastService.showError(
          'Maximum number of tickets for one purchase must be equal or smaller than the total number of tickets'
        );
      }

      const ticket = this.ticketInput
        ? {
            ...this.ticketInput,
            name: ticketName,
            price: ticketPrice,
            quantity: ticketQuantity,
            minimumPurchase: ticketMinimumPurchase,
            maximumPurchase: ticketMaximumPurchase,
            description: ticketDescription,
          }
        : new TicketModel(
            ticketName,
            ticketPrice,
            ticketQuantity,
            ticketMinimumPurchase,
            ticketMaximumPurchase,
            ticketDescription
          );
      if (this.ticketInput) {
        this.ticketEditOutput.emit(ticket);
      } else {
        this.ticketCreateOutput.emit(ticket);
      }
      this.onFormClose();
    } else {
      this.toastService.showError('Invalid Input Field');
    }
  }
}
