import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConstantService } from '../../../../../constant.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ToastsManager } from 'ng2-toastr';
import { FeesService } from '../fees.service';
import { DatepickerOptions } from 'ng2-datepicker';
import { frLocale } from 'ngx-bootstrap';
import {NgbDateStruct, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-add-feeterm',
  templateUrl: './add-feeterm.component.html',
  styleUrls: ['./add-feeterm.component.scss']
})
export class AddFeetermComponent implements OnInit {

  feeTermid:any [];
  constructor(public feesService: FeesService,private spinnerService: Ng4LoadingSpinnerService,
    private toastr: ToastsManager, vcr: ViewContainerRef,
     private constantService: ConstantService,private router: Router, private  route:ActivatedRoute) {
      this.toastr.setRootViewContainerRef(vcr);
      this.route.params.subscribe(params => {
        if(params.id > 0){
          this.feeTermid = params.id;
        }
      })
    }

  feeYear: any [];  
  feeterm: any = {
    name:'',
    feeYearId:{
      id:'-1',
      status:'true'
    },
    effectiveDate:'',
    expiryDate:''
  }
  ngOnInit() {
    this.getFeeYear();
  }

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


  getFeeYear(){
    this.spinnerService.show();
    this.feesService.fetchFeeYear()
    .subscribe(response => {
      if (response.length < 1) {
        this.toastr.info('Data Not Found!', 'Info!');
      } else {
        this.feeYear = response;        
      }
      this.spinnerService.hide();
    }, error => {
      console.log(error);
      this.toastr.error('An Error Occured!', 'Error!');
      this.spinnerService.hide();
    })
  }

  addFeeTerm(feeterm){
    this.spinnerService.show();
    this.feeterm.effectiveDate = new DatePipe('en-IN').transform(this.feeterm.effectiveDate, 'yyyy-MM-dd');
    this.feeterm.endTimestamp = new DatePipe('en-IN').transform(this.feeterm.expiryDate, 'yyyy-MM-dd');
    this.feeterm.effectiveDate += 'T00:00:00.000Z';
    this.feeterm.expiryDate += 'T23:59:59.000Z';
    console.log(feeterm);
   this.feesService.addFeeTerm(feeterm)
      .subscribe(response => {
        this.toastr.success('Fees Term Added Successfully!', 'Success!');
        this.flushfeeterm();
        this.router.navigate(['/fees/manage-feeterm']);
        this.spinnerService.hide();
      }, error => {
        console.log(error);
        this.toastr.error('Fees Term Added Failed!', 'Error!');
        this.spinnerService.hide();
      })
  }

  flushfeeterm(){
    this.feeterm = {
      name:'',
      feeYearId:{
        id:'-1',
        status:'true'
      },
      effectiveDate:'',
      expiryDate:''
    }
  }

}
