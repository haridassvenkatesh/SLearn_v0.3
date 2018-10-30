import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StaffsRoutingModule } from './staffs-routing.module';
import { AddStaffsComponent } from './add-staffs/add-staffs.component';
import { StaffsListComponent } from './staffs-list/staffs-list.component';
// import { StaffDetailsComponent } from './staff-details/staff-details.component';
import { StaffDashboardComponent } from './staff-dashboard/staff-dashboard.component';
import { TabsModule } from 'ngx-bootstrap';
import { FormsModule } from '@angular/forms';
import { FusionChartsModule } from 'angular4-fusioncharts';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { ChartModule } from 'angular-highcharts';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { StaffsService } from './staffs.service';
import { HttpClientModule } from '@angular/common/http';
import { ConstantService } from '../../../../constant.service';
import { SharedModule } from '../../../../shared/shared.module';
//import { Ng2PopupModule } from 'ng2-popup';
import { CourseCompletionsComponent } from './course-completions/course-completions.component';
import { StudentsDetailsComponent } from './students-details/students-details.component';
import { StudentsReportcardComponent } from './students-reportcard/students-reportcard.component';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { BarRatingModule } from 'ngx-bar-rating';
import { ModalModule } from 'ngx-bootstrap/modal';
import { StaffPerformanceComponent } from './staff-performance/staff-performance.component';
import { SidebarModule } from 'ng-sidebar';
import { NgDatepickerModule } from 'ng2-datepicker';




import { ToastModule } from 'ng2-toastr';
import {NgxSmoothDnDModule} from 'ngx-smooth-dnd';
import { StudentsAttendanceComponent } from './students-attendance/students-attendance.component';
import { LeaveRequestComponent } from './leave-request/leave-request.component';
import { DateService } from '../../../../date.service';
import { DepartmentsService } from '../../master_entry/departments/departments.service';
import { StudentsAttendanceManageComponent } from './students-attendance-manage/students-attendance-manage.component';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    StaffsRoutingModule,
    FusionChartsModule,
    TabsModule.forRoot(),
    ChartModule,
    HttpClientModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    SharedModule,
    NgDatepickerModule,
    //Ng2PopupModule,
    NgCircleProgressModule,
    NgxSmoothDnDModule,
    BarRatingModule,
    ModalModule.forRoot(),
    ToastModule.forRoot(),
    Ng4LoadingSpinnerModule.forRoot(),
    SidebarModule.forRoot()
  ],
  declarations: [AddStaffsComponent, StaffsListComponent, StaffDashboardComponent, CourseCompletionsComponent, StudentsDetailsComponent, StudentsReportcardComponent, StaffPerformanceComponent, StudentsAttendanceComponent, LeaveRequestComponent, StudentsAttendanceManageComponent],
  providers: [
    StaffsService,
    ConstantService,
    DateService,
    DepartmentsService
  ]
})
export class StaffsModule { }
