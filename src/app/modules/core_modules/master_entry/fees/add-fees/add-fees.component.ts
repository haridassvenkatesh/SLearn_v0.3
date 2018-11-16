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
      console.log('params-fee', params);
      if (params.id > 0) {
        this.subgroupId = params.id;
        this.feeMapId = params.id_1;
        if (params.id != params.id_1) {
        this.getFees(this.feeMapId);
        }
      }
    })
  }
  subgroupId: any;
  feeyear: any = [];
  feetype: any = [];

  fees: any = {
    instituteBatchId: '-1',
 
    feeTerm: {
      id: '-1',
      name: '',
      feeYearId: {
        id: '-1'
      },

      effectiveDate: '',
      expiryDate: '',
    },

    feeType: {
      id: '-1'
    },
    feeAmount: ''
  }

  updateButton: boolean = false;

  selection: any = [];
  feeMapId: any = [];
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
    this.fees.feeTerm.effectiveDate = new DatePipe('en-IN').transform(this.fees.effectiveDate, 'yyyy-MM-dd');
    this.fees.feeTerm.effectiveDate = new DatePipe('en-IN').transform(this.fees.expiryDate, 'yyyy-MM-dd');
    this.fees.feeTerm.effectiveDate += 'T00:00:00.000Z';
    this.fees.feeTerm.expiryDate += 'T23:59:59.000Z';
    console.log('fees',fees);
    this.feesService.addFees(fees, this.subgroupId)
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
  
  /**  FEES UPDATE **/
  getFees(fees_id) {
    this.feesService.getFees(fees_id)
      .subscribe(response => {
        console.log('get-fess', response);
        this.fees = response; 
        this.fees.instituteBatchId = response.instituteBatchId;
        this.fees.feesTerm.feeYearId.id = response.feesTerm.feeYearId.id;
        this.fees.feeType.id = response.feeType.id;
        this.fees.feeTerm.effectiveDate = new DatePipe('en-IN').transform(response.feeTerm.effectiveDate, 'yyyy-MM-dd');
        this.fees.feeTerm.expiryDate = new DatePipe('en-IN').transform(response.feeTerm.expiryDate, 'yyyy-MM-dd');
        this.fees.feeterm.effectiveDate += 'T06:39:22.692Z';
        this.fees.feeterm.expiryDate += 'T06:39:22.692Z';
        this.fees.feeTerm.id = response.feeTerm.id;
        this.fees.feeTerm.name = response.feeTerm.name;
        console.log(this.fees);
        this.updateButton = true;
      })
  }

  updateFeeMap(){
    this.spinnerService.show();
    this.feesService.updateFeeMap(this.feeMapId, this.fees)
      .subscribe(response => {
        this.toastr.success('Fees Updated Successfully!', 'Success!');
        this.spinnerService.hide();
      }, error => {
        console.log(error);
        this.toastr.error('Fees Updattion Failed!', 'Error!');
        this.spinnerService.hide();
       })
  } 


}
