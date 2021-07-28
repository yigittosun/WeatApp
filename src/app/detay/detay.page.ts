import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController,ModalController } from '@ionic/angular';
import { ApiService } from '../api.service';
import { MesajComponent } from '../modals/mesaj/mesaj.component';
import { TodoModalComponent } from '../modals/todo-modal/todo-modal.component';

@Component({
  selector: 'app-detay',
  templateUrl: './detay.page.html',
  styleUrls: ['./detay.page.scss'],
})
export class DetayPage implements OnInit {
public todoListSub:any=[];
public title:any=[];
public user_id:any;
public id:any;
public tarih:any;
public saat:any;
public mesajlist:any;
  constructor(private activatedRoute: ActivatedRoute,public router:Router,private apiWeb:ApiService,public modalController: ModalController,private alertController: AlertController) { }

  ngOnInit() {
  // this.todoListAll();
  }



  /////Liste

  ionViewWillEnter(){

    this.todoListAll();
    this.mesajListAll();
    console.log("22");
  }
  todoListAll(){
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.user_id = this.activatedRoute.snapshot.paramMap.get('user_id');
    this.title = this.activatedRoute.snapshot.paramMap.get('title');
    this.tarih = this.activatedRoute.snapshot.paramMap.get('tarih');
    this.saat = this.activatedRoute.snapshot.paramMap.get('saat');
    let bodyTodoList = {operation_type:"select",service_type:"todoList",user_id:this.user_id,detail_id:this.id,status:0};
    this.apiWeb.webService(bodyTodoList).subscribe(data=>{
      this.todoListSub = data.data;

      if(!this.todoListSub){
        this.todoListSub=[];
      }
   
    })

    
  }

/// Mesaj servisi

mesajListAll(){

  let bodyTodoList = {operation_type:"select",service_type:"mesaj",user_id:this.user_id,detail_id:this.id};
  this.apiWeb.webService(bodyTodoList).subscribe(data=>{
    this.mesajlist = data.data;
    console.log("mesaj");
    console.log(this.mesajlist);

    if(!this.mesajlist){
      this.mesajlist=[];
    }
 
  })

  
}

/// Mesaj Modal

async mesajModal() {
  const modal = await this.modalController.create({
    component: MesajComponent,
    componentProps: {
      'user_id': this.user_id,
      'id':this.id
    },
    cssClass: 'my-custom-class'
  });

  modal.onDidDismiss().then(mesajData=>{

    if(mesajData.data.mesaj){
      this.mesajDbAdd(mesajData.data.mesaj);
      this.mesajListAll();
    }
    

  })
  
  return await modal.present();
}

mesajDbAdd(mesaj){

  let bodyTodoList = {operation_type:"insert",service_type:"mesaj",user_id:this.user_id,no:this.id,mesaj:mesaj};
  this.apiWeb.webService(bodyTodoList).subscribe(data=>{
      // this.todoListAll();
      
        let baslik="Message Status:";
        let mesaj="Successfully Completed!";
        this.apiWeb.presentToast(baslik,mesaj);
        /// User bilgileri local hafızaya kayit işlemi yapilacak
       // localStorage.setItem('userJSON',JSON.stringify(this.userData.data));
  })

}


detailOpen(no,user_id,baslik,tarih,saat){
  this.router.navigate(['detay/',no,user_id,baslik,tarih,saat]);
 }



updateStatus(no,durum,aktif_durum){
   
  let bodyTodoList = {operation_type:"update",service_type:"todo",user_id:this.user_id,is_no:no,no:no,aktif_durum:aktif_durum,durum:durum};
  this.apiWeb.webService(bodyTodoList).subscribe(data=>{
       this.todoListAll();
      
        let baslik="Kayıt durum";
        let mesaj="Başarı Tamamlandı";
        this.apiWeb.presentToast(baslik,mesaj);
        /// User bilgileri local hafızaya kayit işlemi yapilacak
       // localStorage.setItem('userJSON',JSON.stringify(this.userData.data));
  })

}


/// iş Modal

async isModal() {
  const modal = await this.modalController.create({
    component: TodoModalComponent,
    componentProps: {
      'is_no': this.id
    },
    cssClass: 'my-custom-class'
  });

  modal.onDidDismiss().then(todoData=>{
    console.log(todoData.data.aData);
    if(todoData.data.aData){
      this.todoDbAdd(todoData.data.aData,todoData.data.bData,todoData.data.cData,todoData.data.user_data);
    }
    

  })

  return await modal.present();
}



  
todoDbAdd(baslik,b_tarih,b_saat,s_user_no){
  console.log(baslik+":deneme");
  let bodyTodoList = {operation_type:"insert",service_type:"todoAdd",user_id:this.user_id,baslik:baslik,is_no:this.id,durum:0,b_tarih:b_tarih,b_saat:b_saat,s_user_id:s_user_no};
  this.apiWeb.webService(bodyTodoList).subscribe(data=>{
        this.todoListSub = data.data;
        console.log(this.todoListSub);
        let baslik="Add Status:";
        let mesaj="Successfully Added!";
        this.apiWeb.presentToast(baslik,mesaj);

        /// User bilgileri local hafızaya kayit işlemi yapilacak
       // localStorage.setItem('userJSON',JSON.stringify(this.userData.data));
  })
}



todoDelete(no,is_no,view){
  /*
  $no=$gelen_data->no;
$is_no=$gelen_data->is_no;
$view=$gelen_data->view;
  */
  console.log("sil:"+no);
  let bodyTodoList = {operation_type:"delete",service_type:"todo",user_id:this.user_id,is_no:is_no,no:no,view:view};
          this.apiWeb.webService(bodyTodoList).subscribe(data=>{
             
                let baslik="Delete Status:";
                let mesaj="Successfully Deleted!";
                this.apiWeb.presentToast(baslik,mesaj);

         
                /// User bilgileri local hafızaya kayit işlemi yapilacak
               // localStorage.setItem('userJSON',JSON.stringify(this.userData.data));
          })
          this.todoListAll();
}
async delPress(no,is_no,view) {
  const alert = await this.alertController.create({
    cssClass: 'my-custom-class',
    header: 'Warning!',
    message: 'Do You Want Delete!!!',
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        cssClass: 'secondary',
        handler: (blah) => {
          console.log('Confirm Cancel: blah');
        }
      }, {
        text: 'Okay',
        handler: () => {
          console.log('Confirm Okay');
          this.todoDelete(no,is_no,view)
        }
      }
    ]
  });

  await alert.present();
}
}
