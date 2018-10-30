import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PenaltyRoutingModule } from './penalty-routing.module';
import { AddPenaltyComponent } from './add-penalty/add-penalty.component';
import { AssignPenaltyComponent } from './assign-penalty/assign-penalty.component';
import { ManagePenaltyComponent } from './manage-penalty/manage-penalty.component';
import { EditPenaltyComponent } from './edit-penalty/edit-penalty.component';

@NgModule({
  imports: [
    CommonModule,
    PenaltyRoutingModule
  ],
  declarations: [AddPenaltyComponent, AssignPenaltyComponent, ManagePenaltyComponent, EditPenaltyComponent]
})
export class PenaltyModule { }
