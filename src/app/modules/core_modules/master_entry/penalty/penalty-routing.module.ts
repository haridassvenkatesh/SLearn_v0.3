import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddPenaltyComponent } from './add-penalty/add-penalty.component';
import { AssignPenaltyComponent } from './assign-penalty/assign-penalty.component';
import { ManagePenaltyComponent } from './manage-penalty/manage-penalty.component';
import { EditPenaltyComponent } from './edit-penalty/edit-penalty.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Penalty'
    },
    children: [
      {
        path: 'add-penalty',
        component: AddPenaltyComponent,
        data: {
          title: 'Add Penalty'
        }
      },
      {
        path: 'assign-penalty',
        component: AssignPenaltyComponent,
        data: {
          title: 'Assign Penalty'
        }
      },
      {
        path: 'manage-penalty',
        component: ManagePenaltyComponent,
        data: {
          title: 'Manage Penalty'
        }
      },
      {
        path: 'edit-penalty',
        component: EditPenaltyComponent,
        data: {
          title: 'Edit Penalty'
        }
      },
     
     
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PenaltyRoutingModule { }
