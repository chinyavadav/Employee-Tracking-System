import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { Http } from '@angular/http';
import { GlobalProvider } from "../../providers/global/global";
import { Storage } from '@ionic/storage';

/**
 * Generated class for the MySchedulesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-schedules',
  templateUrl: 'my-schedules.html',
})
export class MySchedulesPage {
	schedules:any;
	constructor(public toastCtrl:ToastController, public storage:Storage, public alertCtrl:AlertController, public http:Http,public global:GlobalProvider,public navCtrl: NavController, public navParams: NavParams) {
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad MySchedulesPage');
		this.getSchedules();
	}

	getSchedules() {
		this.http.get(this.global.serverAddress+"api/my-schedules.php?ecno="+this.global.session.fldemployee_id)
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
}
