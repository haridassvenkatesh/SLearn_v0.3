import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConstantService } from '../../../../../constant.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ToastsManager } from 'ng2-toastr';
import { FeesService } from '../fees.service';
import { DatepickerOptions } from 'ng2-datepicker';
import { frLocale } from 'ngx-bootstrap';

@Component({
  selector: 'app-add-fees',
  templateUrl: './add-fees.component.html',
  styleUrls: ['./add-fees.component.scss']
})
export class AddFeesComponent implements OnInit {

  constructor(public feesService: FeesService,private spinnerService: Ng4LoadingSpinnerService,
    private toastr: ToastsManager, vcr: ViewContainerRef,
     private constantService: ConstantService,private router: Router) {
      this.toastr.setRootViewContainerRef(vcr);
    }

  feeyear: any = [];
  date: Date;
  fees: any = {  
    feeTerm: {
      name: '',
      feeYearId: {        
        name: '',
        status: 'true'
      },
      effectiveDate: '',
      expiryDate: ''
    },
    feeType: {     
      name: '',
      status: 'true'
    },
    feeAmount: ''
  }
  options: DatepickerOptions = {
    minYear: 2010,
    maxYear: 2050,
    displayFormat: 'DD-MM-YYYY',
    locale: frLocale,
    placeholder: 'Click to select a date',
    fieldId: 'my-date-picker',
  };

  ngOnInit() {
  this.getFeeYear();
  }


  getFeeYear(){
    this.spinnerService.show();
    this.feesService.fetchFeeYear()
    .subscribe(response => {
      if (response.length < 1) {
        this.toastr.info('Data Not Found!', 'Info!');
      } else {
        this.feeyear = response;
        console.log(this.feeyear);
      }
      this.spinnerService.hide();
    }, error => {
      console.log(error);
      this.toastr.error('An Error Occured!', 'Error!');
      this.spinnerService.hide();
    })
  }

  
}
