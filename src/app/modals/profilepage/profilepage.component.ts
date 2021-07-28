import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ApiService } from 'src/app/api.service';


@Component({
  selector: 'app-profilepage',
  templateUrl: './profilepage.component.html',
  styleUrls: ['./profilepage.component.scss'],
})
export class ProfilepageComponent implements OnInit {
  public userData:any=[];
  public todoList:any=[];
  public user_id:number;
  darkMode:boolean=true;

  constructor(public modalCtrl: ModalController,private apiWeb:ApiService) { 
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    this.darkMode=prefersDark.matches;
  }

  ngOnInit() {
    this.userData = JSON.parse(localStorage.getItem('userJSON'));

  
   
    console.log(this.user_id);
   /**/
    if(this.userData){
      this.user_id = this.userData.no;
      let bodyTodoList = {operation_type:"select",service_type:"todoList",user_id:this.user_id,detail_id:0,status:0};
      this.apiWeb.webService(bodyTodoList).subscribe(data=>{
            this.todoList = data;
            console.log(this.todoList);

            /// User bilgileri local hafızaya kayit işlemi yapilacak
            //localStorage.setItem('userJSON',JSON.stringify(this.userData.data));
      })
      
    }
  }
  
  //Close page
  dismiss(aciklama) {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalCtrl.dismiss({
      'dismissed': true,
      'mesaj':aciklama
    });
  }

//Dark mode
  cambio(){
    this.darkMode =!this.darkMode;
    document.body.classList.toggle('dark');
  }



}
