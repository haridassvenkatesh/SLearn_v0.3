import { Component, OnInit, ViewContainerRef, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConstantService } from '../../../../../constant.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ToastsManager } from 'ng2-toastr';
import { FeesService } from '../fees.service';

import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';

@Component({
  selector: 'app-add-feetype',
  templateUrl: './add-feetype.component.html',
  styleUrls: ['./add-feetype.component.scss']
})
export class AddFeetypeComponent implements OnInit {

  constructor(public feesService: FeesService,private spinnerService: Ng4LoadingSpinnerService,
  private toastr: ToastsManager, vcr: ViewContainerRef,
   private constantService: ConstantService,private router: Router,private chRef: ChangeDetectorRef) {
    this.toastr.setRootViewContainerRef(vcr);
  }
  data: any = [];
  dataTable: any;
  fees: any = {
    name: '',
    status: 'true'
  }
  ngOnInit() {
    this.getFeeType();
  }

  getFeeType(){
    this.spinnerService.show();
    this.feesService.fetchFees()
    .subscribe(response => {
      if (response.length < 1) {
        this.toastr.info('Data Not Found!', 'Info!');
      } else {        
        this.data = response;
        this.chRef.detectChanges();
        const table:any=$('table');
        this.dataTable=table.DataTable();
        
      }
      this.spinnerService.hide();
    }, error => {
      console.log(error);
      this.toastr.error('An Error Occured!', 'Error!');
      this.spinnerService.hide();
    })
  }

  submitFeeType(fees) { 
    this.spinnerService.show();
    this.feesService.addFeeType(fees)
      .subscribe(response => {
        this.data = response;
        this.router.navigate(["add-feetype"]);
        this.toastr.success('Fees Type Added Successfully!', 'Success!');
        this.getFeeType();
        this.spinnerService.hide();
      }, error => {
        console.log(error);
        this.toastr.error('Fees Type Added Failed!', 'Error!');
        this.spinnerService.hide();
      })
  }
 
}
