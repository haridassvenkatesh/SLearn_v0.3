import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddFeesComponent } from './add-fees/add-fees.component';
import { AssignFeesComponent } from './assign-fees/assign-fees.component';
import { EditFeesComponent } from './edit-fees/edit-fees.component';
import { ManageFeesComponent } from './manage-fees/manage-fees.component';
import { AddFeetypeComponent } from './add-feetype/add-feetype.component';
import { AddFeeyearComponent } from './add-feeyear/add-feeyear.component';
import { AddSubgroupComponent } from './add-subgroup/add-subgroup.component';
import { AddFeetermComponent } from './add-feeterm/add-feeterm.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Fees'
    },
    children: [
      {
        path: 'add-fees',
        component: AddFeesComponent,
        data: {
          title: 'Add Fees'
        }
      },
      {
        path: 'assign-fees',
        component: AssignFeesComponent,
        data: {
          title: 'Assign Fees'
        }
      },
      {
        path: 'edit-fees',
        component: EditFeesComponent,
        data: {
          title: 'Edit Fees'
        }
      },
      {
        path: 'manage-fees',
        component: ManageFeesComponent,
        data: {
          title: 'Manage Fees'
        }
      },
      {
        path: 'add-feeyear',
        component: AddFeeyearComponent,
        data: {
          title: 'Add Fees Yeat'
        }
      },
      {
        path: 'add-feetype',
        component: AddFeetypeComponent,
        data: {
          title: 'Add Fees Type'
        }
      },
      {
        path: 'add-subgroup',
        component: AddSubgroupComponent,
        data: {
          title: 'Add Sub Group'
        }
      },
      {
        path: 'add-feeterm',
        component: AddFeetermComponent,
        data: {
          title: 'Add Fee Term'
        }
      }
     
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeesRoutingModule { }
