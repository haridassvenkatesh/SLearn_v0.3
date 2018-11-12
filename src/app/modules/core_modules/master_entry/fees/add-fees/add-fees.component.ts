import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConstantService } from '../../../../../constant.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ToastsManager } from 'ng2-toastr';
import { FeesService } from '../fees.service';
import { DatepickerOptions } from 'ng2-datepicker';
import { frLocale } from 'ngx-bootstrap';
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { BatchService } from '../../../master_entry/batch/batch.service';

@Component({
  selector: 'app-add-fees',
  templateUrl: './add-fees.component.html',
  styleUrls: ['./add-fees.component.scss']
})
export class AddFeesComponent implements OnInit {

  constructor(public feesService: FeesService,
    private batchService: BatchService,
    private spinnerService: Ng4LoadingSpinnerService,
    private toastr: ToastsManager, vcr: ViewContainerRef,
    private constantService: ConstantService, private router: Router) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  feeyear: any = [];
  feetype: any = [];
  fees: any = {
    feeTerm: {
      name: '',
      instituteBatchId: '-1',
      feeYearId: {
        name: '-1',
        status: 'true'
      },
      effectiveDate: '',
      expiryDate: ''
    },
    feeType: {
      name: '-1',
      status: 'true'
    },
    feeAmount: ''
  }
  selection: any = [];
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
    this.getFeeYear();
    this.getFeeType();
    this.getBatchs();
    //this.spinner();
  }

  // spinner(){
  //   this.spinnerService.show();
  // }

  getFeeYear() {
    this.spinnerService.show();
    this.feesService.fetchFeeYear()
      .subscribe(response => {
        if (response.length < 1) {
          this.toastr.info('Data Not Found!', 'Info!');
        } else {
          this.feeyear = response;
        }
        this.spinnerService.hide();
      }, error => {
        console.log(error);
        this.toastr.error('An Error Occured!', 'Error!');
        this.spinnerService.hide();
      })
  }

  getFeeType() {
    this.spinnerService.show();
    this.feesService.fetchFees()
      .subscribe(response => {
        if (response.length < 1) {
          this.toastr.info('Data Not Found!', 'Info!');
        } else {
          this.feetype = response;
        }
        this.spinnerService.hide();
      }, error => {
        console.log(error);
        this.toastr.error('An Error Occured!', 'Error!');
        this.spinnerService.hide();
      })
  }

  addFees(fees) {
       
    console.log(fees);
    //  this.spinnerService.show();
    //  this.fees.effectiveDate = new DatePipe('en-IN').transform(this.fees.effectiveDate, 'yyyy-MM-dd');
    //  this.fees.endTimestamp = new DatePipe('en-IN').transform(this.fees.expiryDate, 'yyyy-MM-dd');
    //  this.fees.effectiveDate += 'T00:00:00.000Z';
    //  this.fees.expiryDate += 'T23:59:59.000Z';
    //  console.log(fees);
    //  this.feesService.addFees(fees)
    //    .subscribe(response => {
    //      this.toastr.success('Fees Added Successfully!', 'Success!');

    //      this.spinnerService.hide();
    //    }, error => {
    //      console.log(error);
    //      this.toastr.error('Fees Added Failed!', 'Error!');
    //      this.spinnerService.hide();
    //           })
  }

  getBatchs() {
    this.batchService.fetchBatchDetails()
      .subscribe(response => {        
        this.selection = response;
        // 
        
        console.log(this.selection);
        //this.fetchStudents(this.selection[0].id);
        //this.fetchStudents(1);
      })
  }
 
  

}
