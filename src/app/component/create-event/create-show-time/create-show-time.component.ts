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
import { EmptyComponent } from '../../../common/empty/empty.component';
import ShowTimeModel from '../../../dto/model/show-time-model';
import TicketModel from '../../../dto/model/ticket-model';
import { ConfirmService } from '../../../service/confirm.service';
import { ToastService } from '../../../service/toast.service';
import { CreateTicketComponent } from '../create-ticket/create-ticket.component';
@Component({
  selector: 'app-create-show-time',
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
    CreateTicketComponent,
    EmptyComponent,
  ],
  templateUrl: './create-show-time.component.html',
  styleUrl: './create-show-time.component.scss',
})
export class CreateShowTimeComponent implements OnInit, OnChanges {
  @Input() isCreateShowTimeFormVisible: boolean = false;
  @Input() showTimeInput?: ShowTimeModel;

  @Output() isCreateShowTimeFormVisibleChange = new EventEmitter<boolean>();
  @Output() showTimeCreateOutput: EventEmitter<ShowTimeModel> =
    new EventEmitter<ShowTimeModel>();
  @Output() showTimeEditOutput: EventEmitter<ShowTimeModel> =
    new EventEmitter<ShowTimeModel>();
  ticketTypes: TicketModel[] = [];

  isCreateTicketFormVisible: boolean = false;
  selectedTicket?: TicketModel;
  selectedTicketIndex: number = -1;
  createShowTimeForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private toastService: ToastService,
    private confirmService: ConfirmService
  ) {
    this.createShowTimeForm = this.fb.group({
      showStartAt: [null, [Validators.required]],
      showEndAt: [null, [Validators.required]],
      saleStartAt: [null, [Validators.required]],
      saleEndAt: [null, [Validators.required]],
    });
  }

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges) {
    if (this.showTimeInput) {
      this.createShowTimeForm.patchValue({
        showStartAt: this.showTimeInput.showStartAt,
        showEndAt: this.showTimeInput.showEndAt,
        saleStartAt: this.showTimeInput.saleStartAt,
        saleEndAt: this.showTimeInput.saleEndAt,
      });
      this.ticketTypes = Array.from(this.showTimeInput.tickets);
    }
  }

  onFormClose() {
    this.isCreateShowTimeFormVisibleChange.emit(false);
    this.createShowTimeForm.reset();
    this.ticketTypes = [];
    this.showTimeInput = undefined;
  }

  onSubmit() {
    if (this.createShowTimeForm.valid) {
      const { showStartAt, showEndAt, saleStartAt, saleEndAt } =
        this.createShowTimeForm.value;

      if (showStartAt >= showEndAt) {
        return this.toastService.showError(
          'Show Time Start must before Show Time End'
        );
      }

      if (saleStartAt >= saleEndAt) {
        return this.toastService.showError(
          'Sale Time Start must before than Sale Time End'
        );
      }

      if (showStartAt < saleStartAt) {
        return this.toastService.showError(
          'Show Time Start must after than Sale Time Start'
        );
      }

      if (showStartAt < saleEndAt) {
        return this.toastService.showError(
          'Show Time Start must after Sale Time End'
        );
      }

      if (this.ticketTypes.length == 0) {
        return this.toastService.showError('Ticket Types must cannot be empty');
      }

      const showTime = new ShowTimeModel(
        showStartAt,
        showEndAt,
        saleStartAt,
        saleEndAt,
        this.ticketTypes
      );
      if (this.showTimeInput) {
        this.showTimeEditOutput.emit(showTime);
      } else {
        this.showTimeCreateOutput.emit(showTime);
      }
      this.onFormClose();
    } else {
      this.toastService.showError('Invalid field');
    }
  }

  onTicketCreate(ticket: TicketModel) {
    this.ticketTypes.push(ticket);
  }

  onTicketEdit(ticket: TicketModel) {
    if (this.selectedTicketIndex !== -1) {
      this.ticketTypes[this.selectedTicketIndex] = ticket; // Update the ticket at the stored index
    }
  }

  onTicketDelete(index: number) {
    this.ticketTypes.splice(index, 1);
  }

  showCreateTicketForm() {
    this.selectedTicket = undefined;
    this.selectedTicketIndex = -1;
    this.isCreateTicketFormVisible = true;
  }

  showEditTicketForm(index: number) {
    this.selectedTicket = this.ticketTypes[index];
    this.selectedTicketIndex = index;
    this.isCreateTicketFormVisible = true;
  }

  showDeleteTicketConfirmDialog(event: Event, index: number) {
    this.confirmService.confirmDelete(event, () => {
      this.onTicketDelete(index);
    });
  }
}
