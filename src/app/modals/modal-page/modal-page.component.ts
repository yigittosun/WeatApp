import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-modal-page',
  templateUrl: './modal-page.component.html',
  styleUrls: ['./modal-page.component.scss'],
})
export class ModalPageComponent implements OnInit {
public user_name:string;
public user_email:string;
public user_password:string;
public sonuc:any;
public userData:any=[];
  constructor(public toastController: ToastController,public modalController: ModalController,private http:HttpClient) { }

  ngOnInit() {}

  userSave(name,email,password){
    console.log("Name:"+this.user_name);
    let body ={operation_type:"insert",service_type:"kullanici",user_name:name,user_email:email,user_password:password}
    this.http.post("http://microwebservice.net/ecodation/todo_servis/todo_servis.php",body).subscribe(data =>{
      this.sonuc=data;
        if(data=0){
          this.presentToast('danger','Registered user');
        }else{
          console.log("You can registered")
          this.presentToast('success','Welcome..You can login!');
          this.sonuc=data;
          localStorage.setItem('userJSON',JSON.stringify(data));
          this.userData= data;
        }
  },error=>{
      console.log("Oops..Something goes wrong!");
    })
    this.dismiss();
    this.presentToast('success','Welcome..You can login! ');
  }

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true
    });
  }

  //Warning Message

  async presentToast(colour,message) {
    const toast = await this.toastController.create({
      message: message,
      color:colour,
      position:"top",
      duration: 2500
    });
    toast.present();
  }

}

