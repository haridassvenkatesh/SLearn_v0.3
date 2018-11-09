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
import { AddFeetermComponent } from './add-feeterm/add-feeterm.component';
import { HttpClientModule } from '@angular/common/http';
import {DpDatePickerModule} from 'ng2-date-picker';
import { ManageFeetermComponent } from './manage-feeterm/manage-feeterm.component';
import { BatchService } from '../../master_entry/batch/batch.service';
import { TabModule } from 'angular-tabs-component';




@NgModule({
  imports: [
    CommonModule,
    FeesRoutingModule,
    NgDatepickerModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    Ng4LoadingSpinnerModule.forRoot(),
    NgMultiSelectDropDownModule.forRoot(),
    HttpClientModule,
    DpDatePickerModule,
    TabModule
  ],
  declarations: [AddFeesComponent, AssignFeesComponent, EditFeesComponent, ManageFeesComponent, AddFeetypeComponent, AddFeeyearComponent, AddSubgroupComponent, AddFeetermComponent, ManageFeetermComponent],
  providers: [
  FeesService,
  BatchService
  ]
})
export class FeesModule { }
