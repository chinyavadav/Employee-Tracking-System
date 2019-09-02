import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MySchedulesPage } from './my-schedules';

@NgModule({
  declarations: [
    MySchedulesPage,
  ],
  imports: [
    IonicPageModule.forChild(MySchedulesPage),
  ],
})
export class SchedulesPageModule {}
