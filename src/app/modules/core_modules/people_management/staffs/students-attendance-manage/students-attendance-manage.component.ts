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
  selector: 'app-students-attendance-manage',
  templateUrl: './students-attendance-manage.component.html',
  styleUrls: ['./students-attendance-manage.component.scss']
})
export class StudentsAttendanceManageComponent implements OnInit {

  constructor(private StaffService: StaffsService, private spinnerService: Ng4LoadingSpinnerService,
    private toastr: ToastsManager,
    vcr: ViewContainerRef, private router: Router, private batchService: BatchService, ) {
    this.toastr.setRootViewContainerRef(vcr);
  }


  ngOnInit() {
    //  this.stafftkattend(this.id);
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
  batch_id: any = [];
  presentlist1: any = [];
  absentlist1: any = [];
  atten_fin: any = [];
  students: any = [];

  display_presentli: any = [];
  display_absentli: any = [];

  attenfinal: any = [];

  id: any = -1;
  atten_date:any = new Date(Date.now());
  atten_batch: any;
  atten_session: any;


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
    addStyle: {}, // Optional, value to pass to [ngStyle] on the input field
    fieldId: 'my-date-picker', // ID to assign to the input field. Defaults to datepicker-<counter>
    useEmptyBarTitle: false,

  };

  // Staff Taking Attendance
  // stafftkattend(id) {
  //   if (id == -1) {
  //     this.toastr.error('Select Batch', 'Error!');
  //   } else {
  //     this.StaffService.staffStuAtten(id)
  //       .subscribe(response => {
  //         this.staffatt = response;
  //       //  console.log(this.staffatt);
  //       }, error => {
  //         this.toastr.error('Error Occurred!', 'Error!');
  //       })
  //   }

  // }

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
    //  this.stafftkattend(id);
    this.batch_id = id;
  }

  Select_session(id: number) {
    this.atten_session = id;
  }

  get_attendnace() {
    this.atten_date = new DatePipe('en-IN').transform(this.atten_date, 'dd-MM-yyyy');
    this.StaffService.getStudentAttendance(this.batch_id, this.atten_date, this.atten_session)
      .subscribe(response => {
        this.students = response
        for (let i = 0; i < this.students.length; i++) {
          if (this.students[i].status == 'Absent') {
            this.absentlist.push(this.students[i])
          } else if (this.students[i].status == 'Present') {
            this.presentlist.push(this.students[i])
          }
        }
        
        this.spinnerService.hide();
      })
      this.atten_date = new Date(Date.now());
  }

  onDrop(collection, dropResult, val) {
    this[collection] = applyDrag(this[collection], dropResult);
    // for(let i = 0; i<this[collection].length; i++){
    //   if(dropResult.payload.id[i] = this[collection].payload.id){
    //     this[collection].splice(this[collection][i])
    //   }
    // }
    // console.log(dropResult);
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
    this.atten_date = new DatePipe('en-IN').transform(this.atten_date, 'dd-MM-yyyy');

    for (let i = 0; i < this.presentlist.length; i++) {
      this.presentlist[i] = { id: this.presentlist[i].id, status: 'Present', userRepoId: this.presentlist[i].userRepoId }
    }
    for (let i = 0; i < this.absentlist.length; i++) {
      this.absentlist[i] = { id: this.absentlist[i].id, status: 'Absent', userRepoId: this.absentlist[i].userRepoId }
    }
    this.atten_fin = this.presentlist.concat(this.absentlist);

    // this.StaffService.manageStuAtten(this.batch_id,this.atten_date, this.atten_session, this.atten_fin)
    // .subscribe(response => {
    //   this.toastr.success('Stuents Added Successfully!', 'Success!');
    //   this.spinnerService.hide();
    // }, error => {
    //   console.log(error);
    //   this.toastr.error('Stuents Added Failed!', 'Error!');
    //   this.spinnerService.hide();
    // })
  }

}
