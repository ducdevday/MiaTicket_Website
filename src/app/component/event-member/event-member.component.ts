import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { PaginatorModule } from 'primeng/paginator';
import { TableModule } from 'primeng/table';
import MemberModel from '../../dto/model/member-model';
import PaginationModel from '../../dto/model/pagination-model';
import { EventMemberFormComponent } from './event-member-form/event-member-form.component';
import { OrganizerService } from '../../service/organizer.service';
import { ActivatedRoute } from '@angular/router';
import GetEventMembersRequest from '../../dto/request/get-event-members-request';
import { OrganizerPosition } from '../../dto/enum/organizer-position';
import { ConfirmationService } from 'primeng/api';
import { ConfirmService } from '../../service/confirm.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastService } from '../../service/toast.service';

@Component({
  selector: 'app-event-member',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    TableModule,
    PaginatorModule,
    EventMemberFormComponent,
  ],
  templateUrl: './event-member.component.html',
  styleUrl: './event-member.component.scss',
})
export class EventMemberComponent implements OnInit {
  searchFrom!: FormGroup;

  eventId!: number;
  eventName: string = '';
  isMemberFormVisible: boolean = false;
  selectedMember?: MemberModel;

  PAGE_INDEX: number = 1;
  PAGE_SIZE: number = 3;
  pagination!: PaginationModel;
  canAddNewMembers: boolean = true;
  addAbleRoles: OrganizerPosition[] = [];
  members: MemberModel[] = [];

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private organizerService: OrganizerService,
    private toastService: ToastService,
    private confirmService: ConfirmService
  ) {
    this.searchFrom = fb.group({
      keyword: [''],
    });
  }

  ngOnInit(): void {
    this.pagination = new PaginationModel(
      this.PAGE_INDEX,
      this.PAGE_SIZE,
      0,
      0
    );
    this.getEventIdParams();
    this.fetchMembersData();
  }
  getEventIdParams() {
    this.eventId = this.route.snapshot.params['eventId'] as number;
  }
  fetchMembersData() {
    const { keyword } = this.searchFrom.value;
    var request = new GetEventMembersRequest(
      keyword,
      this.pagination.currentPageIndex,
      this.pagination.currentPageSize
    );
    this.organizerService.getEventMembers(this.eventId, request).subscribe({
      next: (response) => {
        this.eventName = response.data.eventName;
        this.canAddNewMembers = response.data.canAddNewMembers;
        this.addAbleRoles = response.data.addAbleRoles;
        this.members = response.data.members;
        this.pagination.totalRecords = response.totalRecords;
      },
      error: (err) => {},
    });
  }
  onSearchButtonPressed() {
    if (this.searchFrom.valid) {
      this.pagination.currentPageIndex = this.PAGE_INDEX;
      this.fetchMembersData();
    }
  }
  showAddMemberForm() {
    this.selectedMember = undefined;
    this.isMemberFormVisible = true;
  }
  showEditMemberForm(member: MemberModel) {
    this.selectedMember = member;
    this.isMemberFormVisible = true;
  }
  showRemoveMemberConfirmDialog(event: Event, member: MemberModel) {
    this.confirmService.confirmDelete(event, () => {
      this.onMemberRemove(member.memberId);
    });
  }
  onPageChange(event: any) {
    this.pagination.currentPageIndex = event.page + 1;
    this.fetchMembersData();
  }
  onMemberAdd() {
    this.pagination.currentPageIndex = this.PAGE_INDEX;
    this.fetchMembersData();
  }
  onMemberEdit() {
    this.pagination.currentPageIndex = this.PAGE_INDEX;
    this.fetchMembersData();
  }
  onMemberRemove(memberId: string) {
    this.organizerService.deleteEventMember(this.eventId, memberId).subscribe({
      next: (response) => {
        this.toastService.showSuccess(response.message);
        this.fetchMembersData();
      },
      error: (err: HttpErrorResponse) => {
        this.toastService.showError(err.error.message);
      },
    });
  }
  getRoleName(role: OrganizerPosition): string {
    switch (role) {
      case OrganizerPosition.Owner:
        return 'Owner';
      case OrganizerPosition.Moderator:
        return 'Moderator';
      case OrganizerPosition.Coordinator:
        return 'Coordinator';
    }
  }
}
