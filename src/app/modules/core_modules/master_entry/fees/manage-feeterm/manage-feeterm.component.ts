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
  selector: 'app-manage-feeterm',
  templateUrl: './manage-feeterm.component.html',
  styleUrls: ['./manage-feeterm.component.scss']
})
export class ManageFeetermComponent implements OnInit {

  subgroupid: any; 
  constructor(public feesService: FeesService,private spinnerService: Ng4LoadingSpinnerService,
    private toastr: ToastsManager, vcr: ViewContainerRef,
     private constantService: ConstantService,private router: Router,private chRef: ChangeDetectorRef,
     private  route:ActivatedRoute) {
      this.toastr.setRootViewContainerRef(vcr);
      this.route.params.subscribe(params => {
        if(params.id > 0){
          this.subgroupid = params.id;
        }
      })
    }

  data: any [];
  
  dataTable: any;   
 
  ngOnInit() {
    this.getFeesTerm(); 
  }

  getFeesTerm(){
    this.spinnerService.show();
    this.feesService.manageFeesTerm(this.subgroupid)
    .subscribe(response => {
        this.data = response;     
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

  moveaddFeeTerm(subgroup_id){
    console.log(subgroup_id);
    this.router.navigate(['/fees/add-feeterm/',subgroup_id]);
  }
}
