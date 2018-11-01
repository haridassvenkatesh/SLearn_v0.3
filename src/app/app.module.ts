import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';

// Import containers
import {
  FullLayoutComponent,
  SimpleLayoutComponent
} from './containers';

const APP_CONTAINERS = [
  FullLayoutComponent,
  SimpleLayoutComponent
]

// Import components
import {
  AppAsideComponent,
  AppBreadcrumbsComponent,
  AppFooterComponent,
  AppHeaderComponent,
  AppSidebarComponent,
  AppSidebarFooterComponent,
  AppSidebarFormComponent,
  AppSidebarHeaderComponent,
  AppSidebarMinimizerComponent,
  APP_SIDEBAR_NAV,
} from './components';

const APP_COMPONENTS = [
  AppAsideComponent,
  AppBreadcrumbsComponent,
  AppFooterComponent,
  AppHeaderComponent,
  AppSidebarComponent,
  AppSidebarFooterComponent,
  AppSidebarFormComponent,
  AppSidebarHeaderComponent,
  AppSidebarMinimizerComponent,
  APP_SIDEBAR_NAV,
]

// Import directives
import {
  AsideToggleDirective,
  NAV_DROPDOWN_DIRECTIVES,
  ReplaceDirective,
  SIDEBAR_TOGGLE_DIRECTIVES
} from './directives';

const APP_DIRECTIVES = [
  AsideToggleDirective,
  NAV_DROPDOWN_DIRECTIVES,
  ReplaceDirective,
  SIDEBAR_TOGGLE_DIRECTIVES
]

// Import routing module
import { AppRoutingModule } from './app.routing';

// Import 3rd party components
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { TabsModule } from 'ngx-bootstrap/tabs';
// import { ChartsModule } from 'ng2-charts/ng2-charts';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

/*** FUSION CHARTS ***/
// FUSION CHARTS
import * as FusionCharts from 'fusioncharts';
import * as Charts from 'fusioncharts/fusioncharts.charts';
import * as FintTheme from 'fusioncharts/themes/fusioncharts.theme.fint';
import { FusionChartsModule } from 'angular4-fusioncharts';
FusionChartsModule.fcRoot(FusionCharts, Charts, FintTheme);

// HIGHCHARTS
// import { ChartModule, HIGHCHARTS_MODULES } from 'angular-highcharts';
import { ChartModule } from 'angular2-highcharts';
import exporting from 'highcharts/modules/exporting.src.js';

// FOR TABS
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import 'web-animations-js/web-animations.min';
//import { NguiTabModule } from '@ngui/tab';
import { MatButtonModule, MatCheckboxModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';

// FOR PAGINATIONS
import { NgxPaginationModule } from 'ngx-pagination';
import { PaginationModule } from 'ngx-bootstrap';
import { StudentsModule } from './modules/core_modules/people_management/students/students.module';
import { StaffsModule } from './modules/core_modules/people_management/staffs/staffs.module';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'ng2-toastr/ng2-toastr';
import { DepartmentsModule } from './modules/core_modules/master_entry/departments/departments.module';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { CalendarModule } from 'angular-calendar';
import { DemoUtilsModule } from './components/app-calender/demo-utils/module';
import { SharedModule } from './shared/shared.module';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { HttpStatusService } from './http-status.service';

import { DateService } from './date.service';
import { SidebarModule } from 'ng-sidebar';

import { NgDatepickerModule } from 'ng2-datepicker';

/*** HARI MODULES ***/
import { NgxSpinnerModule } from 'ngx-spinner';
import { LoginModule } from './modules/core_modules/people_management/login/login.module';
import { CookieService } from 'angular2-cookie/services/cookies.service';




export function highchartModules() {
  return [exporting];
}

@NgModule({
  imports: [
    BsDropdownModule.forRoot(),
    CarouselModule.forRoot(),
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TabsModule.forRoot(),
    ChartModule,
    FusionChartsModule,
    BrowserAnimationsModule,
    //NguiTabModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    PaginationModule.forRoot(),
    StudentsModule,
    StaffsModule,
    ToastModule,
    DepartmentsModule,
    MatButtonModule,
    MatCheckboxModule,
    NgbModalModule.forRoot(),
    CalendarModule.forRoot(),
    DemoUtilsModule,
    SharedModule,
    Ng4LoadingSpinnerModule.forRoot(),
    SidebarModule.forRoot(),
    NgxSpinnerModule,
    LoginModule,
    HttpClientModule,
    NgDatepickerModule,

  ],
  declarations: [
    AppComponent,
    ...APP_CONTAINERS,
    ...APP_COMPONENTS,
    ...APP_DIRECTIVES,
  


    
  ],
  providers: [{
    provide: LocationStrategy,
    useClass: HashLocationStrategy,
  }, HttpStatusService, DateService, CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
