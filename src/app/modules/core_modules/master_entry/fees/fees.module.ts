import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgDatepickerModule } from 'ng2-datepicker';



import { FeesRoutingModule } from './fees-routing.module';
import { AddFeesComponent } from './add-fees/add-fees.component';
import { AssignFeesComponent } from './assign-fees/assign-fees.component';
import { EditFeesComponent } from './edit-fees/edit-fees.component';
import { ManageFeesComponent } from './manage-fees/manage-fees.component';
import { AddFeetypeComponent } from './add-feetype/add-feetype.component';
import { AddFeeyearComponent } from './add-feeyear/add-feeyear.component';
import { FeesService } from './fees.service';
import { AddSubgroupComponent } from './add-subgroup/add-subgroup.component';

@NgModule({
  imports: [
    CommonModule,
    FeesRoutingModule,
    NgDatepickerModule
  
  ],
  declarations: [AddFeesComponent, AssignFeesComponent, EditFeesComponent, ManageFeesComponent, AddFeetypeComponent, AddFeeyearComponent, AddSubgroupComponent],
  providers: [
  FeesService
  ]
})
export class FeesModule { }
