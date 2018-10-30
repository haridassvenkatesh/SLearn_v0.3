import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { StaffsService } from '../staffs.service';
import { ConstantService } from '../../../../../constant.service';
import { ToastsManager } from 'ng2-toastr';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { DatepickerOptions } from 'ng2-datepicker';
import { frLocale } from 'ngx-bootstrap';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-leave-request',
  templateUrl: './leave-request.component.html',
  styleUrls: ['./leave-request.component.scss']
})

export class LeaveRequestComponent implements OnInit {
  // Date Picker

  date: Date;
  options: DatepickerOptions = {
    minYear: 2010,
    maxYear: 2050,
    displayFormat: 'DD-MM-YYYY',
    // barTitleFormat: 'MMMM YYYY',
    //   dayNamesFormat: 'dd',
    //   firstCalendarDay: 0, // 0 - Sunday, 1 - Monday
    locale: frLocale,
    //   minDate: new Date(Date.now()), // Minimal selectable date
    //   maxDate: new Date(Date.now()),  // Maximal selectable date
    //   barTitleIfEmpty: 'Click to select a date',
    placeholder: 'Click to select a date', // HTML input placeholder attribute (default: '')
    //   addClass: 'form-control', // Optional, value to pass on to [ngClass] on the input field
    //   addStyle: {}, // Optional, value to pass to [ngStyle] on the input field
    fieldId: 'my-date-picker', // ID to assign to the input field. Defaults to datepicker-<counter>
    // // useEmptyBarTitle: false,
  };

  leave: any = {
    startDate: this.date,
    endDate: this.date,
    message: '',
    leaveType: -1
  }

  leaveType: any = [];
  updateButton: Boolean = false;

  constructor(private vcr: ViewContainerRef, private toastr: ToastsManager, private spinnerService: Ng4LoadingSpinnerService, private constantService: ConstantService, private staffsService: StaffsService) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.fetchLeaveType();
  }

  fetchLeaveType() {
    this.constantService.getLeaveType()
      .subscribe(response => {
        this.leaveType = response;
      })
  }

  submitLeaveRequest() {
    this.spinnerService.show();

    this.leave.startDate = new DatePipe('en-IN').transform(this.leave.startDate, 'dd-MM-yyyy');
    this.leave.endDate = new DatePipe('en-IN').transform(this.leave.endDate, 'dd-MM-yyyy');
    console.log(this.leave);
    this.staffsService.submitLeaveRequest(this.leave)
      .subscribe(response => {
        this.toastr.success('Leave Request Submitted!', 'Success!');
        this.spinnerService.hide();
      }, error => {
        console.log(error);
        this.toastr.error('Leave Request Failed!', 'Error!');
        this.spinnerService.hide();
      })
  }
}