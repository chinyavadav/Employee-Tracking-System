import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController, AlertController, ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Http } from '@angular/http';
import { GlobalProvider } from '../../providers/global/global';
/**
 * Generated class for the AddEmployeePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-employee',
  templateUrl: 'add-employee.html',
})
export class AddEmployeePage {
	private registrationForm: FormGroup;
  constructor(private formBuilder: FormBuilder,public toastCtrl: ToastController, public global: GlobalProvider, private navCtrl: NavController, private loadingCtrl: LoadingController, public alertCtrl: AlertController, public http: Http) {
  	var validators={
      "phoneno":[Validators.required,Validators.pattern("[0-9]{10}")],
      "name":[Validators.required,Validators.pattern("[A-Za-z\s]{2,50}")],
      "password":[Validators.required,Validators.minLength(8),Validators.maxLength(20)]
    };
    this.registrationForm=this.formBuilder.group({
      phoneno: ['',validators.phoneno],      
      forename: ['',validators.name],
      surname: ['',validators.name],
      role: ['',Validators.required],
      password: ['',validators.password],
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddEmployeePage');
  }

  register() {
    console.log(this.registrationForm.value);
    if(this.registrationForm.valid){
      let loader = this.loadingCtrl.create({
        content: "Registering...",
        spinner:"bubbles"
      });
      loader.present();
      this.http.post(this.global.serverAddress+"api/addemployee.php", JSON.stringify(this.registrationForm.value))
        .subscribe(data => {
          console.log(data["_body"]);
          let response = JSON.parse(data["_body"]);
          if(response.response=="success"){
             let alert = this.alertCtrl.create({
                title: 'Registration',
                subTitle: 'Employee successfully created!',
                buttons: ['OK']
            });
             alert.present();
            this.navCtrl.pop();
          }else{
            let alert = this.alertCtrl.create({
                title: 'Registration',
                subTitle: 'Phone Number is already taken!',
                buttons: ['OK']
            });
            alert.present();
         }
        }, error => {
	      	let toast = this.toastCtrl.create({
	          message: 'Resolve Connectivity Issue!',
	          duration: 3000,
	          position: 'bottom',
	          cssClass: 'dark-trans',
	          closeButtonText: 'OK',
	          showCloseButton: true
	        });
	    	  toast.present();
        }
      );
      loader.dismiss();
    }else{
      let toast = this.toastCtrl.create({
        message: 'Properly fill in all details!',
        duration: 3000,
        position: 'bottom',
        cssClass: 'dark-trans',
        closeButtonText: 'OK',
        showCloseButton: true
      });
      toast.present();
    }
  }


}
