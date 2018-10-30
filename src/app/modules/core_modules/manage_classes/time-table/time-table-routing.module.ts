import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManualComponent } from './manual/manual.component';
import { AutomaticComponent } from './automatic/automatic.component';

const routes: Routes = [
  {
    path : '',
    data : {
      title : 'Time Table'
    },
    children : [
      {
        path : 'manual-tt',
        component : ManualComponent,
        data : {
          title : 'Manual Generation'
        }
      },
      {
        path : 'automatic-tt',
        component : AutomaticComponent,
        data : {
          title : 'Automatic Generation'
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TimeTableRoutingModule { }
