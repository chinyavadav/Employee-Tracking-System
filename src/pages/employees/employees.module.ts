import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EmployeesPage } from './employees';

@NgModule({
  declarations: [
    EmployeesPage,
  ],
  imports: [
    IonicPageModule.forChild(EmployeesPage),
  ],
})
export class EmployeesPageModule {}
