import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgDatepickerModule } from 'ng2-datepicker';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';

import { PenaltyRoutingModule } from './penalty-routing.module';
import { AddPenaltyComponent } from './add-penalty/add-penalty.component';
import { AssignPenaltyComponent } from './assign-penalty/assign-penalty.component';
import { ManagePenaltyComponent } from './manage-penalty/manage-penalty.component';
import { EditPenaltyComponent } from './edit-penalty/edit-penalty.component';
import { PenaltyService } from './penalty.service';
import { SharedModule } from '../../../../shared/shared.module';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { HttpClientModule } from '@angular/common/http';
import {DpDatePickerModule} from 'ng2-date-picker';
import { BatchService } from '../../master_entry/batch/batch.service';

@NgModule({
  imports: [
    CommonModule,
    PenaltyRoutingModule,
    NgDatepickerModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    Ng4LoadingSpinnerModule.forRoot(),
    NgMultiSelectDropDownModule.forRoot(),
    HttpClientModule,
    DpDatePickerModule
  ],
  declarations: [AddPenaltyComponent, AssignPenaltyComponent, ManagePenaltyComponent, EditPenaltyComponent],
  providers: [
    PenaltyService,
    BatchService,
    
    ]
})
export class PenaltyModule { }
