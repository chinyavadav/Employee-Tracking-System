import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { Http } from '@angular/http';
import { GlobalProvider } from "../../providers/global/global";
import { Storage } from '@ionic/storage';

/**
 * Generated class for the SchedulesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-schedules',
  templateUrl: 'schedules.html',
})
export class SchedulesPage {
	schedules:any;
	constructor(public toastCtrl:ToastController, public storage:Storage, public alertCtrl:AlertController, public http:Http,public global:GlobalProvider,public navCtrl: NavController, public navParams: NavParams) {
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad SchedulesPage');
		this.getSchedules();
	}

	getSchedules() {
		this.http.get(this.global.serverAddress+"api/schedules.php?ecno="+this.global.session.fldemployee_id)
		.subscribe(data => {
			let response=JSON.parse(data["_body"]);
			console.log(response);
			this.schedules=response;
		}, error => {
			let alert = this.alertCtrl.create({
              title: 'Schedules',
              subTitle: 'Error connecting to Intenet!',
              buttons: ['OK']
            });
            alert.present();
		});
  	}

  	filterSchedules(ev: any) {
	    this.http.get(this.global.serverAddress+"api/schedules.php?ecno="+this.global.session.fldemployee_id)
	      .subscribe(data => {
	        let response=JSON.parse(data["_body"]);
	        console.log(response);
	        let val = ev.target.value;
	        if (val && val.trim() !== '') {
	          	this.schedules = response.filter((report) => {
	            	return ((report.fldsurname.toLowerCase().indexOf(val.toLowerCase()) > -1));
	          	});
	        }else{
	        	this.schedules=response;
	        }
	      }, error => {
		        let toast = this.toastCtrl.create({
	              message: 'Please connect to Internet!',
	              duration: 3000,
	              position: 'bottom',
	              cssClass: 'dark-trans',
	              closeButtonText: 'OK',
	              showCloseButton: true
	            });
	            toast.present();
	      }
	    );
	}
}
