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
    private route: ActivatedRoute) {
    this.toastr.setRootViewContainerRef(vcr);
    this.route.params.subscribe(params => {
      if (params.id > 0) {
        this.subgroupid = params.id;
        this.getFees(params.id);
      }
    })
  }
  subgroupid: any;
  feeyear: any = [];
  feetype: any = [];
  
  fees: any = {
    instituteBatchId: '-1',
    feeYearId: {
      id: '-1'
    },
    effectiveDate: '',
    expiryDate: '',

    feeTerm: {
      id: '-1',
     
    },
    feeType: {
      id: '-1'
    },
    feeAmount: ''
  }
  selection: any = [];
  feeTermId: any = [];
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
    this.getFeeTermId();
    
  }


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
    this.spinnerService.show();
    this.fees.effectiveDate = new DatePipe('en-IN').transform(this.fees.effectiveDate, 'yyyy-MM-dd');
    this.fees.endTimestamp = new DatePipe('en-IN').transform(this.fees.expiryDate, 'yyyy-MM-dd');
    this.fees.effectiveDate += 'T00:00:00.000Z';
    this.fees.expiryDate += 'T23:59:59.000Z';
    this.feesService.addFees(fees, this.subgroupid)
    .subscribe(response => {
      this.toastr.success('Fees Added Successfully!', 'Success!');

      this.spinnerService.hide();
    }, error => {
      console.log(error);
      this.toastr.error('Fees Added Failed!', 'Error!');
      this.spinnerService.hide();
    })
  }

  getBatchs() {
    this.batchService.fetchBatchDetails()
      .subscribe(response => {
        this.selection = response;        
      })
  }
  getFeeTermId() {
    this.feesService.manageFeesTerm(this.subgroupid)
      .subscribe(response => {
        this.feeTermId = response;
        //console.log(this.feeTermId);
      })
  }


  /**  FEES UPDATE **/
  getFees(fees_id){
    this.feesService.getFees(fees_id)
      .subscribe(response => {
        this.fees = response;     
        this.fees.instituteBatchId = response.instituteBatchId; 
        this.fees.id = response.id; 
        this.fees.feeType.id = response.feeType.id; 
        this.fees.feeTerm.effectiveDate = response.feeTerm.effectiveDate;
        this.fees.feeTerm.expiryDate = response.feeTerm.expiryDate;
        this.fees.feeTerm.id = response.feeTerm.id; 
        console.log(this.fees);
      })
  }


}
