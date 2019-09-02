import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController, LoadingController } from 'ionic-angular';
import { GlobalProvider } from "../../providers/global/global";
import { Geolocation } from '@ionic-native/geolocation';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 @IonicPage()
 @Component({
   selector: 'page-home',
   templateUrl: 'home.html',
 })
 export class HomePage {
   loader:any;
   statusRecord:any;
   statusRecordLength:number=0;
   constructor(public storage:Storage, public loadingCtrl:LoadingController, public http:Http, public geolocation:Geolocation, public toastCtrl: ToastController, public alertCtrl:AlertController, public global:GlobalProvider, public navCtrl: NavController, public navParams: NavParams) {
   }

   ionViewDidEnter(){
     this.getStatus();
     console.log('ionViewDidLoad HomePage');
   }

   submit(location_data:any){
     this.http.post(this.global.serverAddress+"/api/location.php", JSON.stringify(location_data))
     .subscribe(data => {
       console.log(data["_body"]);
       let response = JSON.parse(data["_body"]);
       if(response.response=="success"){
         console.log('successfully uploaded!');
       }else{
         console.log('failed to update coordinates!');
       }
     }, error => {
       console.log('Error getting location', error);
     }      
     );
   }

   getStatus(){
     this.http.get(this.global.serverAddress+"/api/status.php?ecno="+this.global.session.fldemployee_id)
     .subscribe(data => {
       let response = JSON.parse(data["_body"]);
       this.statusRecord=response;
       console.log(this.statusRecord);
       this.updateLocation();
       this.statusRecordLength=Object.keys(this.statusRecord).length;
     }, error => {
       console.log('Error getting location', error);
     }      
     );
   }

   updateLocation(){
     this.geolocation.getCurrentPosition({ enableHighAccuracy: true }).then((resp) => {
       let data = {
         lat:resp.coords.latitude,
         lng:resp.coords.longitude,
         employee_id:this.global.session.fldemployee_id
       };
       console.log(this.statusRecordLength);
       if(this.statusRecordLength>=1){
         this.submit(data);
       }else{
         console.log("failed to submit");
       }
     }, err => {
       console.log('Error getting location', err);
     });
   }

   checkIn(){
     let alert = this.alertCtrl.create({
       title: 'Check In',
       subTitle: 'Summarize your tasks for today!',
       inputs: [
       {
         name: 'summary',
         placeholder: 'Summary'
       },
       ],
       buttons:
       [
       {
         text:'Check In', handler: data=>{
           this.loader = this.loadingCtrl.create({
             content: "Requesting...",
             spinner:"bubbles"
           });
           this.loader.present();
           let formData = {
             employee_id:this.global.session.fldemployee_id,
             summary:data.summary
           };
           this.http.post(this.global.serverAddress+"/api/checkin.php", JSON.stringify(formData))
           .subscribe(data => {
             console.log(data["_body"]);
             let response = JSON.parse(data["_body"]);
             if(response.response=="success"){
               let alert = this.alertCtrl.create({
                 title: 'Home',
                 subTitle: "Successfully Checked In!",
                 buttons: ['OK']
               });
               alert.present();
               this.getStatus();
             }else{
               let alert = this.alertCtrl.create({
                 title: 'Home',
                 subTitle: "Check In could not be processed!",
                 buttons: ['OK']
               });
               alert.present();
             }
           }, error => {
             console.log('Error requesting Check In!', error);
           }      
           );
           this.loader.dismiss();
         }
       },
       {
         text: 'Cancel'
       }
       ]
     });
     alert.present();
   }

   checkOut(){
     let alert = this.alertCtrl.create({
       title: 'Check Out',
       subTitle: 'Are you sure you want to check out?',
       buttons:
       [
       {
         text:'Check Out', handler: data=>{
           this.loader = this.loadingCtrl.create({
             content: "Requesting...",
             spinner:"bubbles"
           });
           this.loader.present();
           let formData = {
             employee_id:this.global.session.fldemployee_id,
           };
           this.http.post(this.global.serverAddress+"/api/checkout.php", JSON.stringify(formData))
           .subscribe(data => {
             console.log(data["_body"]);
             let response = JSON.parse(data["_body"]);
             if(response.response=="success"){
               let alert = this.alertCtrl.create({
                 title: 'Home',
                 subTitle: "Successfully Checked Out!",
                 buttons: ['OK']
               });
               alert.present();
               this.getStatus();
             }else{
               let alert = this.alertCtrl.create({
                 title: 'Home',
                 subTitle: "Check Out could not be processed!",
                 buttons: ['OK']
               });
               alert.present();
             }
           }, error => {
             console.log('Error requesting Check In!', error);
           }      
           );
           this.loader.dismiss();
         }
       },
       {
         text: 'Cancel'
       }
       ]
     });
     alert.present();
   }
 }
