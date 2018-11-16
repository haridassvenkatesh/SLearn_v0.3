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
  constructor(public feesService: FeesService, private spinnerService: Ng4LoadingSpinnerService,
    private toastr: ToastsManager, vcr: ViewContainerRef,
    private constantService: ConstantService, private router: Router, private chRef: ChangeDetectorRef,
    private route: ActivatedRoute) {
    this.toastr.setRootViewContainerRef(vcr);
    this.route.params.subscribe(params => {
      if (params.id > 0) {
        this.subgroupid = params.id;
      }
    })
  }

  data1: any[];
  data: any[];
  feemap: any[];

  dataTable: any;

  ngOnInit() {
    this.getFeesTerm();
    this.getFees();
    this.getFeesMap();
  }

  getFeesTerm() {
    this.spinnerService.show();
    this.feesService.manageFeesTerm(this.subgroupid)
      .subscribe(response => {
        this.data = response;
        //   console.log(this.data);     
        this.chRef.detectChanges();
        const table: any = $('table');
        this.dataTable = table.DataTable();
        this.spinnerService.hide();
      }, error => {
        console.log(error);
        this.toastr.error('An Error Occured!', 'Error!');
        this.spinnerService.hide();
      })
  }


  getFeesMap() {
    this.spinnerService.show();
    this.feesService.manageFees(this.subgroupid)
      .subscribe(response => {
        this.feemap = response;
        //  console.log(this.feemap);    
        this.chRef.detectChanges();
        const table: any = $('table');
        this.dataTable = table.DataTable();
        this.spinnerService.hide();
      }, error => {
        console.log(error);
        this.toastr.error('An Error Occured!', 'Error!');
        this.spinnerService.hide();
      })
  }



  getFees() {
    this.spinnerService.show();
    this.feesService.manageFees(this.subgroupid)
      .subscribe(response => {
        this.data1 = response;
        //  console.log(this.data1);
        this.chRef.detectChanges();
        const table: any = $('table');
        this.dataTable = table.DataTable();
        this.spinnerService.hide();
      }, error => {
        console.log(error);
        this.toastr.error('An Error Occured!', 'Error!');
        this.spinnerService.hide();
      })
  }

  moveAddFeeTerm() {
    this.router.navigate(['/fees/add-feeterm/', this.subgroupid,this.subgroupid]);
  }

  moveEditFeeTerm(feeTerm_id) {
    this.router.navigate(['/fees/add-feeterm/', this.subgroupid,feeTerm_id]);
    //console.log('feetid', feeTerm_id)
  }

  moveAddFeeMap() {
    this.router.navigate(['/fees/add-fees/', this.subgroupid, this.subgroupid]);
  }
  moveEditFeeMap(fees_id) {
    this.router.navigate(['/fees/add-fees/', this.subgroupid, fees_id]);
  }

}
