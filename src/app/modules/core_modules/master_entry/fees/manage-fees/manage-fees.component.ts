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
  selector: 'app-manage-fees',
  templateUrl: './manage-fees.component.html',
  styleUrls: ['./manage-fees.component.scss']
})
export class ManageFeesComponent implements OnInit {

  constructor(public feesService: FeesService,private spinnerService: Ng4LoadingSpinnerService,
    private toastr: ToastsManager, vcr: ViewContainerRef,
     private constantService: ConstantService,private router: Router,private chRef: ChangeDetectorRef) {
      this.toastr.setRootViewContainerRef(vcr);
    }

  data: any []; 
  dataTable: any; 
  clients: any[];

  ngOnInit() {
    this.getFees();
  }

  getFees(){
    this.spinnerService.show();
    this.feesService.manageFees(1)
    .subscribe(response => {
        this.data = response;
        console.log(this.data);
        this.chRef.detectChanges();
        const table:any=$('table');
        this.dataTable=table.DataTable();
        this.spinnerService.hide();
    }, error => {
      console.log(error);
      this.toastr.error('An Error Occured!', 'Error!');
      this.spinnerService.hide();
    })
  }

  moveEditFeeMap(fees_id){
    this.router.navigate(['/fees/add-feeterm/',fees_id]);
  }


}
