import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgDatepickerModule } from 'ng2-datepicker';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';

import { FeesRoutingModule } from './fees-routing.module';
import { AddFeesComponent } from './add-fees/add-fees.component';
import { AssignFeesComponent } from './assign-fees/assign-fees.component';
import { EditFeesComponent } from './edit-fees/edit-fees.component';
import { ManageFeesComponent } from './manage-fees/manage-fees.component';
import { AddFeetypeComponent } from './add-feetype/add-feetype.component';
import { AddFeeyearComponent } from './add-feeyear/add-feeyear.component';
import { FeesService } from './fees.service';
import { AddSubgroupComponent } from './add-subgroup/add-subgroup.component';
import { SharedModule } from '../../../../shared/shared.module';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';


@NgModule({
  imports: [
    CommonModule,
    FeesRoutingModule,
    NgDatepickerModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    Ng4LoadingSpinnerModule.forRoot(),
    NgMultiSelectDropDownModule.forRoot()
  ],
  declarations: [AddFeesComponent, AssignFeesComponent, EditFeesComponent, ManageFeesComponent, AddFeetypeComponent, AddFeeyearComponent, AddSubgroupComponent],
  providers: [
  FeesService
  ]
})
export class FeesModule { }
