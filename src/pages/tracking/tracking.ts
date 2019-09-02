import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ToastController, AlertController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { Storage } from '@ionic/storage';
import { GlobalProvider } from "../../providers/global/global";
import { Http } from '@angular/http';
/**
 * Generated class for the TrackingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
 declare var google: any;

 @IonicPage()
 @Component({
 	selector: 'page-tracking',
 	templateUrl: 'tracking.html',
 })
 export class TrackingPage {
 	@ViewChild('map') mapElement: ElementRef;
 	map: any;
 	nodes=[];
 	markers=[];
 	toast:any;

 	constructor(public http:Http, public global: GlobalProvider, public alertCtrl: AlertController, public toastCtrl:ToastController,public storage: Storage,public geolocation: Geolocation, public navCtrl: NavController, public navParams: NavParams, public platform: Platform) {

 	}

 	ionViewDidLoad() {
 		this.platform.ready().then(() => {
 			this.initMap();
 			this.getLocations();
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

 	getLocations(){
 		this.http.get(this.global.serverAddress+"/api/markers.php?ecno="+this.global.session.fldemployee_id)
 		.subscribe(data => {
 			console.log(data["_body"]);
 			let response = JSON.parse(data["_body"]);
 			this.markers=response;
 			for(var i=0; i < this.markers.length; i++){
 				let location = new google.maps.LatLng(this.markers[i].fldlatitude,this.markers[i].fldlongitude);
 				this.addMarker(location,this.markers[i]);
 			}
 		}, error => {
 			console.log('Error getting location', error);
 		}      
 		);
 	}

 	initMap() {
 		//timeout: 5000
 		this.geolocation.getCurrentPosition({ maximumAge: 3000, enableHighAccuracy: true }).then((resp) => {
 			let mylocation = new google.maps.LatLng(resp.coords.latitude,resp.coords.longitude);
 			this.map = new google.maps.Map(this.mapElement.nativeElement, {
 				zoom: 18,
 				center: mylocation,
 				mapTypeId: 'terrain'
 			});
 		}, err => {
 			this.makeToast("Error: "+err.message);
 		});
 	}

 	addMarker(location,data) {
 		let infoWindowData:any={
 			title: data.fldforename+' '+data.fldsurname,
 			contentString: '<div id="content"><div id="siteNotice"></div><h2 id="firstHeading" class="firstHeading">'+data.fldforename+' '+data.fldsurname+'</h2><div id="bodyContent">Phone No: '+data.fldphone_no+'<br/>Role: '+data.fldrole+'<br/>Date/Time: '+data.fldtimestamp+'</div></div>'

 		};
 		console.log(data);
 		var infowindow = new google.maps.InfoWindow({
 			content: infoWindowData.contentString
 		});
 		let marker = new google.maps.Marker({
 			position: location,
 			map: this.map,
 			animation: google.maps.Animation.DROP,
 		});
 		marker.addListener('click', function() {
 			infowindow.open(this.map, marker);
 			setTimeout(function(){infowindow.close();},5000);      
 		});
 	}
 }
