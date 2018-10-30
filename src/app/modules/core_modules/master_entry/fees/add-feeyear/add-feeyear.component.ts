import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConstantService } from '../../../../../constant.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ToastsManager } from 'ng2-toastr';
import { FeesService } from '../fees.service';

@Component({
  selector: 'app-add-feeyear',
  templateUrl: './add-feeyear.component.html',
  styleUrls: ['./add-feeyear.component.scss']
})
export class AddFeeyearComponent implements OnInit {

  constructor(public feesService: FeesService,private spinnerService: Ng4LoadingSpinnerService,
    private toastr: ToastsManager, vcr: ViewContainerRef,
     private constantService: ConstantService,private router: Router) {
      this.toastr.setRootViewContainerRef(vcr);
    }

    data: any = [];
    fees_year: any = {
      name: '',
      status: 'true'
    }  

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
        this.data = response;
        console.log(this.data);
      }
      this.spinnerService.hide();
    }, error => {
      console.log(error);
      this.toastr.error('An Error Occured!', 'Error!');
      this.spinnerService.hide();
    })
  }

  submitFeeYear(fees) { 
    this.spinnerService.show();
    this.feesService.addFeeYear(fees)
      .subscribe(response => {
        this.data = response;
        this.toastr.success('Fees Year Added Successfully!', 'Success!');
       // this.flushEvents();
        this.spinnerService.hide();
      }, error => {
        console.log(error);
        this.toastr.error('Fees Year Added Failed!', 'Error!');
        this.spinnerService.hide();
      })
  }

}
