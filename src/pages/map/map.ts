import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ToastController, AlertController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { Storage } from '@ionic/storage';
import { GlobalProvider } from "../../providers/global/global";

/**
 * Generated class for the MapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
 declare var google: any;

 @IonicPage()
 @Component({
 	selector: 'page-map',
 	templateUrl: 'map.html',
 })
 export class MapPage {
 	@ViewChild('map') mapElement: ElementRef;
 	map: any;
 	markers=[];
 	nodes:any;

 	toast:any;

 	constructor(public global:GlobalProvider, public alertCtrl: AlertController, public toastCtrl:ToastController,public storage: Storage,public geolocation: Geolocation, public navCtrl: NavController, public navParams: NavParams, public platform: Platform) {

 	}

 	ionViewDidLoad() {
 		this.platform.ready().then(() => {
 			this.initMap();
 		});
 	}

	makeToast(message:string){
		this.toast = this.toastCtrl.create({
			message: message,
			duration: 3000,
			position: 'bottom',
			cssClass: 'dark-trans',
			closeButtonText: 'OK',
			showCloseButton: true
		});
		this.toast.present();
	}

	initMap() {
		//timeout: 5000
		this.geolocation.getCurrentPosition({ maximumAge: 3000, enableHighAccuracy: true }).then((resp) => {
			let mylocation = new google.maps.LatLng(resp.coords.latitude,resp.coords.longitude);
			this.map = new google.maps.Map(this.mapElement.nativeElement, {
				zoom: 15,
				center: mylocation,
				mapTypeId: 'terrain'
			});
			this.addMarker(mylocation);
		}, err => {
			this.makeToast("Error: "+err.message);
		});
	}

	addMarker(location) {
		let marker = new google.maps.Marker({
			position: location,
			map: this.map,
			animation: google.maps.Animation.DROP,
		});
		let infoWindowData:any={
 			title: "My Location",
 			contentString: '<div id="content"><div id="siteNotice"></div><h2 id="firstHeading" class="firstHeading">My Location</h2><div id="bodyContent">Phone No: '+this.global.session.fldphoneno+'<br/>Role: '+this.global.session.fldrole+'<br/>Date/Time: '+this.global.session.fldtimestamp+'</div></div>'

 		};
 		var infowindow = new google.maps.InfoWindow({
 			content: infoWindowData.contentString
 		});
 		marker.addListener('click', function() {
 			infowindow.open(this.map, marker);
 			setTimeout(function(){infowindow.close();},5000);      
 		});
	}
}
