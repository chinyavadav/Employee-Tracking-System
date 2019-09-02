import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SchedulesPage } from './schedules';

@NgModule({
  declarations: [
    SchedulesPage,
  ],
  imports: [
    IonicPageModule.forChild(SchedulesPage),
  ],
})
export class SchedulesPageModule {}
