import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, MenuController, ToastController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';

import { GlobalProvider } from "../providers/global/global";

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { MapPage } from '../pages/map/map';
import { MySchedulesPage } from '../pages/my-schedules/my-schedules';
import { SettingsPage } from '../pages/settings/settings';
import { ManagerPage } from '../pages/manager/manager';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) navCtrl;  
  rootPage:any;
  constructor(public toastCtrl: ToastController, public global: GlobalProvider,public platform: Platform,public statusBar: StatusBar, splashScreen: SplashScreen, public menuCtrl: MenuController, public storage: Storage) {
      this.initializeApp();
      statusBar.styleDefault();
      splashScreen.hide();
  }


  initializeApp(){   
    this.platform.ready().then(() => {          
      this.storage.ready().then(()=> {
        this.storage.get('serverAddress').then((val) =>{
          this.setServerAddress(val);
        });
        this.storage.get('session').then((val) =>{
          this.setAccount(val);
        });
      });
    });
  }

  setAccount(val){
    this.global.session=val;
    if(this.global.session==null){
      this.rootPage = LoginPage;
      this.global.session=null;
    }else{
      this.rootPage = HomePage;
    }
  }

  setServerAddress(val){
    if(val!=null){
      this.global.serverAddress=val;
    }else{
      this.global.serverAddress="http://sharpconsult.000webhostapp.com/";
    }
  }

  openPage(index){
    var pages=[MySchedulesPage,MapPage,SettingsPage,ManagerPage];
    this.navCtrl.push(pages[index]);
  }
  
  logout(){
    this.storage.remove("session"); 
    this.global.session=null;
    this.navCtrl.setRoot(LoginPage);
  }

}

