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
  PatternValidator,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import MemberModel from '../../../dto/model/member-model';
import { OrganizerPosition } from '../../../dto/enum/organizer-position';
import MemberFunction from '../../../dto/model/member-function';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { OrganizerService } from '../../../service/organizer.service';
import { ActivatedRoute } from '@angular/router';
import AddEventMemberRequest from '../../../dto/request/add-event-member-request';
import { EMAIL_PATTERN } from '../../../const/regex';
import { ToastService } from '../../../service/toast.service';
import { HttpErrorResponse } from '@angular/common/http';
import UpdateEventMemberRequest from '../../../dto/request/update-event-member-request';

@Component({
  selector: 'app-event-member-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DialogModule,
    DropdownModule,
    InputTextModule,
    TableModule,
  ],
  templateUrl: './event-member-form.component.html',
  styleUrl: './event-member-form.component.scss',
})
export class EventMemberFormComponent implements OnInit, OnChanges {
  @Input() isMemberFormVisible: boolean = false;
  @Output() isMemberFormVisibleChange = new EventEmitter<boolean>();

  @Input() member?: MemberModel;
  @Input() addAbleRoles: OrganizerPosition[] = [];
  @Output() memberAddEvent = new EventEmitter<void>();
  @Output() memberEditEvent = new EventEmitter<void>();

  eventId!: number;
  memberForm!: FormGroup;
  nameFunctions: string[] = [];
  memberFunctions: MemberFunction[] = [];

  organizerPositions: any[] = [];
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private organizerService: OrganizerService,
    private toastService: ToastService
  ) {
    this.memberForm = this.fb.group({
      memberEmail: [
        '',
        [Validators.required, Validators.pattern(EMAIL_PATTERN)],
      ],
      memberRole: [null, [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.nameFunctions = [
      'Edit Event',
      'Summary',
      'Voucher',
      'Marketing',
      'Order List',
      'Member',
      'Check In',
    ];
    this.memberFunctions = [
      new MemberFunction('Edit Event', true, false, false),
      new MemberFunction('Summary', true, false, false),
      new MemberFunction('Voucher', true, false, false),
      new MemberFunction('Marketing', true, false, false),
      new MemberFunction('Order List', true, true, false),
      new MemberFunction('Member', true, true, false),
      new MemberFunction('Check In', true, true, true),
    ];
    this.getEventIdParams();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.organizerPositions = [];
    this.addAbleRoles.forEach((role) => {
      this.organizerPositions.push(this.formatOrganizerPosition(role));
    });
    if (this.member) {
      this.memberForm.get('memberEmail')?.disable();

      this.memberForm.patchValue({
        memberEmail: this.member.memberEmail,
        memberRole: this.formatOrganizerPosition(this.member.role),
      });
    } else {
      this.memberForm.get('memberEmail')?.enable();

      this.memberForm.reset();
    }
  }
  getEventIdParams() {
    this.eventId = this.route.snapshot.params['eventId'] as number;
  }
  formatOrganizerPosition(role: OrganizerPosition): RoleItem {
    switch (role) {
      case OrganizerPosition.Owner:
        return new RoleItem('Owner', OrganizerPosition.Owner);
      case OrganizerPosition.Moderator:
        return new RoleItem('Moderator', OrganizerPosition.Moderator);
      case OrganizerPosition.Coordinator:
        return new RoleItem('Coordinator', OrganizerPosition.Coordinator);
    }
  }
  onFormClose() {
    this.isMemberFormVisibleChange.emit(false);
    this.memberForm.reset();
  }
  onSubmitButtonPressed() {
    if (this.member == null) {
      this.onAddMember();
    } else {
      this.onEditMember();
    }
  }

  onAddMember() {
    if (this.memberForm.valid) {
      const { memberEmail, memberRole } = this.memberForm.value;
      var request = new AddEventMemberRequest(memberEmail, memberRole.value);
      this.organizerService.addEventMember(this.eventId, request).subscribe({
        next: (response) => {
          this.toastService.showSuccess(response.message);
          this.memberAddEvent.emit();
          this.onFormClose();
        },
        error: (err: HttpErrorResponse) => {
          this.toastService.showError(err.error.message);
        },
      });
    } else {
      this.toastService.showError('Empty Field');
    }
  }

  onEditMember() {
    if (this.memberForm.valid) {
      const { memberEmail, memberRole } = this.memberForm.value;
      var request = new UpdateEventMemberRequest(memberRole.value);
      this.organizerService
        .updateEventMember(this.eventId, this.member!.memberId, request)
        .subscribe({
          next: (response) => {
            this.toastService.showSuccess(response.message);
            this.memberEditEvent.emit();
            this.onFormClose();
          },
          error: (err: HttpErrorResponse) => {
            this.toastService.showError(err.error.message);
          },
        });
    }
  }
}

class RoleItem {
  name!: string;
  value!: OrganizerPosition;
  constructor(name: string, value: OrganizerPosition) {
    this.name = name;
    this.value = value;
  }
}
