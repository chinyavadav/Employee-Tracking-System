import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Geolocation } from '@ionic-native/geolocation';
import { IonicStorageModule } from '@ionic/storage';
import { HttpModule } from '@angular/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { MapPage } from '../pages/map/map';
import { SchedulesPage } from '../pages/schedules/schedules';
import { MySchedulesPage } from '../pages/my-schedules/my-schedules';
import { SettingsPage } from '../pages/settings/settings';
import { ManagerPage } from '../pages/manager/manager';
import { TrackingPage } from '../pages/tracking/tracking';
import { EmployeesPage } from '../pages/employees/employees';
import { AddEmployeePage } from '../pages/add-employee/add-employee';

import { GlobalProvider } from '../providers/global/global';
import { RelativeTimePipe } from '../pipes/relative-time/relative-time';
import { MyServiceProvider } from '../providers/my-service/my-service';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    MapPage,
    RelativeTimePipe,
    SchedulesPage,
    SettingsPage,
    ManagerPage,
    TrackingPage,
    EmployeesPage,
    MySchedulesPage,
    AddEmployeePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    MapPage,
    SchedulesPage,
    SettingsPage,
    ManagerPage,
    TrackingPage,
    EmployeesPage,
    MySchedulesPage,
    AddEmployeePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Geolocation,
    GlobalProvider,
    MyServiceProvider,
  ]
})
export class AppModule {}
