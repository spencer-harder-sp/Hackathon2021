import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MapDashboardComponent } from './map-dashboard/map-dashboard.component';

@NgModule({
  declarations: [
    MapDashboardComponent
  ],
  imports: [
    CommonModule
    ],
  providers: [],
  exports: [MapDashboardComponent]
})
export class MapModule { }
