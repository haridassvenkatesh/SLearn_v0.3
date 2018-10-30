import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ContainerComponent, DraggableComponent, IDropResult, IContainerOptions } from 'ngx-smooth-dnd';
import { applyDrag, generateItems } from './utils';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ToastsManager } from 'ng2-toastr';
import { StaffsService } from '../staffs.service';
import { Router } from '@angular/router';
import { BatchService } from '../../../master_entry/batch/batch.service';
import { DatepickerOptions } from 'ng2-datepicker';
import { frLocale } from 'ngx-bootstrap';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-students-attendance',
  templateUrl: './students-attendance.component.html',
  styleUrls: ['./students-attendance.component.scss']
})
export class StudentsAttendanceComponent implements OnInit {

  constructor(private StaffService: StaffsService, private spinnerService: Ng4LoadingSpinnerService,
    private toastr: ToastsManager,
    vcr: ViewContainerRef, private router: Router, private batchService: BatchService, ) {
    this.toastr.setRootViewContainerRef(vcr);
  }


  ngOnInit() {
    this.stafftkattend(this.id);
    this.getbatch();

    this.getChildPayload1 = this.getChildPayload1.bind(this);
    this.getChildPayload2 = this.getChildPayload2.bind(this);
    this.getChildPayload3 = this.getChildPayload3.bind(this);
  }

  staffatt: any = [];
  present: any = [];
  absentlist: any = [];
  presentlist: any = [];
  batch_data: any = [];
  batch_id: any = -1;
  presentlist1: any = [];
  absentlist1: any = [];
  atten_fin: any = [];

  id: any = -1;
  atten_date: any;
  atten_batch: any;
  atten_session: any = 0;

  atten_filter: any = {
    batch: '-1',
    atten_date: '',
    atten_session: '-1',
  }

  date: Date;
  options: DatepickerOptions = {
    minYear: 2018,
    maxYear: 2050,
    displayFormat: 'DD-MM-YYYY',
    barTitleFormat: 'MMMM YYYY',
    locale: frLocale,
    placeholder: 'Click to select a date', // HTML input placeholder attribute (default: '')
    //addStyle: {}, // Optional, value to pass to [ngStyle] on the input field
    fieldId: 'my-date-picker', // ID to assign to the input field. Defaults to datepicker-<counter>
    useEmptyBarTitle: false,
  };

  // Staff Taking Attendance
  stafftkattend(id) {
    if (id != -1) {
      this.StaffService.staffStudentAttendance(id)
        .subscribe(response => {
          this.staffatt = response;
          console.log(this.staffatt);
        }, error => {
          this.toastr.error('Error Occurred!', 'Error!');
        })
    }
  }

  /** GET BATCH ID  **/
  getbatch() {
    this.batchService.fetchBatchDetails()
      .subscribe(response => {
        if (response.length < 1) {
          this.toastr.info('Batch Not Found!', 'Info!');
        } else {
          this.batch_data = response;
        }
      }, error => {
        console.log(error);
        this.toastr.error('Batch Request Failed!', 'Error!');
      })
  }

  change_batch(id: number) {
    this.stafftkattend(id);
    this.batch_id = id;
  }

  Select_session(id: number) {
    this.atten_session = id;
  }

  onDrop(collection, dropResult) {
    this[collection] = applyDrag(this[collection], dropResult);
  }

  getChildPayload1(index) {
    return this.absentlist[index];
  }

  getChildPayload2(index) {
    return this.staffatt[index];

  }
  getChildPayload3(index) {
    return this.presentlist[index];
  }

  shouldAcceptDrop(sourceContainerOptions, payload) {
    return false;
  }

  submitAttendance() {
    this.spinnerService.show();
  }

  // Attendance 
  atten_Submit() {

    if (this.checkDropdown()) {
      this.atten_date = new DatePipe('en-IN').transform(this.atten_date, 'dd-MM-yyyy');

      for (let i = 0; i < this.presentlist.length; i++) {
        this.presentlist1[i] = { id: this.presentlist[i].id, status: 'Present', userRepoId: this.presentlist[i].repoId }
      }

      for (let i = 0; i < this.absentlist.length; i++) {
        this.absentlist[i].status = 'absent';
        this.absentlist1[i] = { id: this.absentlist[i].id, status: 'Absent', userRepoId: this.absentlist[i].repoId }
      }
      this.atten_fin = this.presentlist1.concat(this.absentlist1);

      this.StaffService.addStudentAttendance(this.batch_id, this.atten_date, this.atten_session, this.atten_fin)
        .then(response => {
          this.toastr.success('Attendance Submitted!', 'Success!');
          this.flushAttendance();
          this.spinnerService.hide();
        }, error => {
          console.log(error);
          this.toastr.error('Submission Failed!', 'Error!');
          this.spinnerService.hide();
        })
    }
  }

  flushAttendance() {
    this.absentlist1 = [];
    this.absentlist = [];
    this.presentlist = [];
    this.presentlist1 = [];
    this.batch_id = -1;
    this.atten_session = 0;
    this.atten_date = '';
  }
  checkDropdown(): boolean {
    if (this.batch_id == -1) {
      this.toastr.info('Select Batch', 'Info!');
      return false;
    }
    else if (this.atten_session == 0) {
      this.toastr.info('Select Session', 'Info!');
      return false;
    }
    else if (this.atten_date == '') {
      this.toastr.info('Select Date', 'Info!');
      return false;
    }
    else {
      return true;
    }
  }
  // tslint:disable-next-line:eofline
}