// Angular
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ColorsComponent } from './colors.component';
import { TypographyComponent } from './typography.component';

// Theme Routing
import { ThemeRoutingModule } from './theme-routing.module';

// FUSION CHARTS
import * as FusionCharts from 'fusioncharts';
import * as Charts from 'fusioncharts/fusioncharts.charts';
import * as FintTheme from 'fusioncharts/themes/fusioncharts.theme.fint';
import { FusionChartsModule } from 'angular4-fusioncharts';

FusionChartsModule.fcRoot(FusionCharts, Charts, FintTheme);

import { TabsModule } from 'ngx-bootstrap';

// HIGHCHARTS
import { ChartModule, HIGHCHARTS_MODULES } from 'angular-highcharts';
import more from 'highcharts/highcharts-more.src';
import exporting from 'highcharts/modules/exporting.src';

export function highchartsModules() {
  // apply Highcharts Modules to this array
  return [ more, exporting ];
}
import {NgxPaginationModule} from 'ngx-pagination';



@NgModule({
  imports: [
    CommonModule,
    ThemeRoutingModule,
    FusionChartsModule,
    TabsModule.forRoot(),
    ChartModule,
    NgxPaginationModule
  ],
  declarations: [
    ColorsComponent,
    TypographyComponent
  ]
})
export class ThemeModule { }
