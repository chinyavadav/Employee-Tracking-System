import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController, LoadingController } from 'ionic-angular';
import { GlobalProvider } from "../../providers/global/global";
import { SchedulesPage } from '../schedules/schedules';
import { TrackingPage } from '../tracking/tracking';
import { EmployeesPage } from '../employees/employees';
import { Geolocation } from '@ionic-native/geolocation';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the ManagerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 @IonicPage()
 @Component({
   selector: 'page-manager',
   templateUrl: 'manager.html',
 })
 export class ManagerPage {
   loader:any;
   constructor(public storage:Storage, public loadingCtrl:LoadingController, public http:Http, public geolocation:Geolocation, public toastCtrl: ToastController, public alertCtrl:AlertController, public global:GlobalProvider, public navCtrl: NavController, public navParams: NavParams) {

   }

   ionViewDidLoad() {
     console.log('ionViewDidLoad ManagerPage');
   }

   showSchedules(){
     this.navCtrl.push(SchedulesPage);
   }


   tracking(){
     this.navCtrl.push(TrackingPage);
   }

  employees(){
     this.navCtrl.push(EmployeesPage);
   }
 }
