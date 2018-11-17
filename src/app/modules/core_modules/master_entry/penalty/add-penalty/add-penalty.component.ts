import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConstantService } from '../../../../../constant.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ToastsManager } from 'ng2-toastr';
import { PenaltyService } from '../penalty.service';
import { DatepickerOptions } from 'ng2-datepicker';
import { frLocale } from 'ngx-bootstrap';
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { BatchService } from '../../../master_entry/batch/batch.service';
import { StudentsService } from '../../../people_management/students/students.service';


@Component({
  selector: 'app-add-penalty',
  templateUrl: './add-penalty.component.html',
  styleUrls: ['./add-penalty.component.scss']
})
export class AddPenaltyComponent implements OnInit {

  constructor(public penaltyService: PenaltyService, private batchService: BatchService,
    private spinnerService: Ng4LoadingSpinnerService,
    private toastr: ToastsManager, vcr: ViewContainerRef,
    private constantService: ConstantService, private router: Router) {
    this.toastr.setRootViewContainerRef(vcr);
  }
  penaltyyear: any = [];
  penaltytype: any = [];
  // penalty: any = {
  //   penaltyTerm: {
  //     name: '',
  //     instituteBatchId: '-1',
  //     penaltyYearId: {
  //       name: '-1',
  //       status: 'true'
  //     },
  //     effectiveDate: '',
  //     expiryDate: ''
  //   },
  //   penaltyType: {
  //     name: '-1',
  //     status: 'true'
  //   },
  //   description: '',
  //   feeAmount: '',
  //   feePaid: '',
  //   feeCredit: ''
  // }

  penalty: any ={
    id: '',
  repoId: '',
  feeTypeId: {
    id: '',
    name: '',
    status: true
  },
  feeMappingId: {
    id: '',
    instituteBatchId: '',
    feeTerm: {
      id: '',
      name: '',
      feeYearId: {
        id: '',
        name: '',
        status: true
      },
      effectiveDate: '',
      expiryDate: ''
    },
    feeType: {
      id: '',
      name: '',
      status: false
    },
    feeAmount: ''
  },
  description:'',
  feeAmount:'',
  feePaid:'',
  feeCredit:''
  }

  selection: any = [];
  students:any = [];

  model;
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
  ngOnInit() {
    this.getPenaltyYear();
    this.getPenaltyType();
    this.getBatchs();
  }
  getPenaltyYear() {
    this.spinnerService.show();
    this.penaltyService.fetchPenaltyYear()
      .subscribe(response => {
        if (response.length < 1) {
          this.toastr.info('Data Not Found!', 'Info!');
        } else {
          this.penaltyyear = response;
        }
        this.spinnerService.hide();
      }, error => {
        console.log(error);
        this.toastr.error('An Error Occured!', 'Error!');
        this.spinnerService.hide();
      })
  }

  getPenaltyType() {
    this.spinnerService.show();
    this.penaltyService.fetchPenalty()
      .subscribe(response => {
        if (response.length < 1) {
          this.toastr.info('Data Not Found!', 'Info!');
        } else {
          this.penaltytype = response;
        }
        this.spinnerService.hide();
      }, error => {
        console.log(error);
        this.toastr.error('An Error Occured!', 'Error!');
        this.spinnerService.hide();
      })
  }

  addPenalty(penalty) {
    console.log(penalty);
  //   this.spinnerService.show();
  //   this.penalty.effectiveDate = new DatePipe('en-IN').transform(this.penalty.effectiveDate, 'yyyy-MM-dd');
  //   this.penalty.endTimestamp = new DatePipe('en-IN').transform(this.penalty.expiryDate, 'yyyy-MM-dd');
  //   this.penalty.effectiveDate += 'T00:00:00.000Z';
  //   this.penalty.expiryDate += 'T23:59:59.000Z';
  //   console.log(penalty);
  //   this.penaltyService.addPenalty(penalty)
  //   // .subscribe(response => {
  //   //   this.toastr.success('Fees Added Successfully!', 'Success!');

  //   //   this.spinnerService.hide();
  //   // }, error => {
  //   //   console.log(error);
  //   //   this.toastr.error('Fees Added Failed!', 'Error!');
  //   //   this.spinnerService.hide();
  //   // })
   }


  getBatchs() {
    this.batchService.fetchBatchDetails()
      .subscribe(response => {
        this.selection = response;
        
      })
  }


  /**  STUDENTS LIST **/
  fetchStudents(id) {
    this.spinnerService.show();
    this.penaltyService.fetchStudentsDetail(id)
      .subscribe(response => {
        if (response.length < 1) {
          this.toastr.info('No Data Found!');
        } else {
          this.students = response;
          console.log(this.students);
        }
        this.spinnerService.hide();
      }, error => {
        this.toastr.error('Error Occurred!', 'Error!');
        this.spinnerService.hide();
      })
  }

  select_student(id){
   this.fetchStudents(id);
  }

}
