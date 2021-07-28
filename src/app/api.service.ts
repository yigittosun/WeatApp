import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public url="http://microwebservice.net/ecodation/todo_servis/todo_servis.php";
  //public serviceData:any;

  constructor(private http:HttpClient,public toastController: ToastController) { }



webService(body):Observable<any>{
 // let body = {operation_type:"select",service_type:"kullanici",user_email:"abc@gmail.com",user_password:"123"};
  return this.http.post(this.url,body);

}


async presentToast(baslik,mesaj) {
  const toast = await this.toastController.create({
    header: baslik,
    message: mesaj,
    position: 'top',
    duration:1000,
    color:'dark'
    /*,
    buttons: [
      {
        side: 'start',
        icon: 'star',
        text: 'Favorite',
        handler: () => {
          console.log('Favorite clicked');
        }
      }, {
        text: 'Done',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }
    ]*/
  });
  toast.present();
}


  /*
  webService(body):Observable<any>{
    // let body = {email:username, sifre:password, serviceName:"users"};
      return this.http.post(this.url,body);
  }

  */

}
