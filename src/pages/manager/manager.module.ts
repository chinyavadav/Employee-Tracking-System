import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ManagerPage } from './manager';

@NgModule({
  declarations: [
    ManagerPage,
  ],
  imports: [
    IonicPageModule.forChild(ManagerPage),
  ],
})
export class ManagerPageModule {}
