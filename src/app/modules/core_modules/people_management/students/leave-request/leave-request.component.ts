import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ToastsManager } from 'ng2-toastr';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ConstantService } from '../../../../../constant.service';
import { StudentsService } from '../students.service';
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

  //statDate: new Date().toISOString().substring(0, 10)
  leave: any = {
    startDate: "",
    endDate: "",
    message: "",
    leaveType: ""
  }

  typeID: any = -1;
  leaveTypes: any = [];

  updateButton: Boolean = false;

  constructor(private vcr: ViewContainerRef, private toastr: ToastsManager, private spinnerService: Ng4LoadingSpinnerService, private constantService: ConstantService, private studentsService: StudentsService) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.fetchLeaveType();
  }

  onChangeLeaveType(id) {
    this.leave.leaveType = id;
  }

  fetchLeaveType() {
    this.constantService.getLeaveType()
      .subscribe(response => {
        this.leaveTypes = response;
      })
  }

  submitLeaveRequest() {
    this.spinnerService.show();
    this.leave.startDate = new DatePipe('en-IN').transform(this.leave.startDate, 'dd-MM-yyyy');
    this.leave.endDate = new DatePipe('en-IN').transform(this.leave.endDate, 'dd-MM-yyyy');
    console.log(this.leave);
    this.studentsService.submitLeaveRequest(this.leave)
      .subscribe(response => {
        this.toastr.success('Leave Request Submitted!', 'Success!');
        this.flushLeave();
        this.spinnerService.hide();
      }, error => {
        console.log(error);
        this.toastr.error('Leave Request Failed!', 'Error!');
        this.spinnerService.hide();
      })
  }
  flushLeave() {
    this.leave = {
      startDate: '',
      endDate: '',
      message: "",
      leaveType: ""
    }
    this.typeID = -1;
  }
}