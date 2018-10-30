import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConstantService } from '../../../../../constant.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ToastsManager } from 'ng2-toastr';
import { FeesService } from '../fees.service';

@Component({
  selector: 'app-add-subgroup',
  templateUrl: './add-subgroup.component.html',
  styleUrls: ['./add-subgroup.component.scss']
})
export class AddSubgroupComponent implements OnInit {

  constructor(public feesService: FeesService,private spinnerService: Ng4LoadingSpinnerService,
    private toastr: ToastsManager, vcr: ViewContainerRef,
     private constantService: ConstantService,private router: Router) {
      this.toastr.setRootViewContainerRef(vcr);
    }

    data: any = [];
    subgroup: any = {
      name: '',
      subgroupType: ''
    }  
  ngOnInit() {
    this.getSubGroup();
  }

  getSubGroup(){
    this.spinnerService.show();
    this.feesService.fetchSubGroup()
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
}
