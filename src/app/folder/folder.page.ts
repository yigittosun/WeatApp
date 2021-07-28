import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, MenuController, ModalController } from '@ionic/angular';
import { ApiService } from '../api.service';
import { GlobalFService } from '../global-f.service';
import { MesajComponent } from '../modals/mesaj/mesaj.component';
import { ModalPageComponent } from '../modals/modal-page/modal-page.component';
import { ProfilepageComponent } from '../modals/profilepage/profilepage.component';
import { TodoModalComponent } from '../modals/todo-modal/todo-modal.component';


@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder: string;
  public user_id:number;
  public userData:any=[];
  public todoList:any=[];
  public personelList:any[];
  public forgetpassword:any;
  public id:any;
  public mesajlist:any;
  darkMode:boolean=true;
  constructor(private activatedRoute: ActivatedRoute,private menu: MenuController, public router:Router,private alertController: AlertController, private apiWeb:ApiService,public modalController: ModalController,private fService:GlobalFService) {}

  ngOnInit() {
    console.log("0");
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
  
    // User daha önceden login olmuş ise direk içeri  al

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

  today : number= Date.now()

  openEnd() {
    this.menu.open('end');
  }

cambio(){
  this.darkMode =!this.darkMode;
  document.body.classList.toggle('dark');
}

/*Dashboarddan çıkış butonu
  exit(){
    localStorage.clear();
    this.userData = [];
  }
 */

  detailOpen(no,user_id,baslik,tarih,saat){
   this.router.navigate(['detay/',no,user_id,baslik,tarih,saat]);
  }

  updateStatus(no,durum,aktif_durum){
   
      let bodyTodoList = {operation_type:"update",service_type:"todo",user_id:this.user_id,is_no:no,no:no,aktif_durum:aktif_durum,durum:durum};
      this.apiWeb.webService(bodyTodoList).subscribe(data=>{
           this.tosoListAll();
          
            let baslik="Add Status:";
            let mesaj="Successfully Added!";
            this.apiWeb.presentToast(baslik,mesaj);
            /// User bilgileri local hafızaya kayit işlemi yapilacak
           // localStorage.setItem('userJSON',JSON.stringify(this.userData.data));
      })

  }

  ionViewWillEnter(){
    console.log("1");
    this.tosoListAll();

  }

  tosoListAll(){
  
    let bodyTodoList = {operation_type:"select",service_type:"todoList",user_id:this.user_id,detail_id:0,status:0};
    this.apiWeb.webService(bodyTodoList).subscribe(data=>{
          this.todoList = data;
          console.log(this.todoList);
  
          /// User bilgileri local hafızaya kayit işlemi yapilacak
          //localStorage.setItem('userJSON',JSON.stringify(this.userData.data));
    })
  }

personel(role){
  let bodyTodoList = {operation_type:"select",service_type:"personel",role:role};
  this.apiWeb.webService(bodyTodoList).subscribe(data=>{
        this.personelList = data.data;


        /// User bilgileri local hafızaya kayit işlemi yapilacak
        localStorage.setItem('personelJSON',JSON.stringify(this.personelList));
  })
  
}

  onLogin(name,email,password){
    let body = {operation_type:"select",service_type:"kullanici",user_name:name,user_email:email,user_password:password};
    this.apiWeb.webService(body).subscribe(data=>{
    this.userData = data;
    console.log(this.userData);
    this.user_id = this.userData.data.no;

          if(this.user_id){
            let bodyTodoList = {operation_type:"select",service_type:"todoList",user_id:this.user_id,detail_id:0,status:0};
            this.apiWeb.webService(bodyTodoList).subscribe(data=>{
                  this.todoList = data;
                  this.personel(this.userData.data.yonetici_no);
            
                  console.log(this.userData.data.yonetici_no);

                  /// User bilgileri local hafızaya kayit işlemi yapilacak
                  localStorage.setItem('userJSON',JSON.stringify(this.userData.data));



            })
          }
    })

  }

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

// Register
async userModal(){
  const modal=await this.modalController.create({
    component: ModalPageComponent,
    cssClass:'my-custom-class'
  });
  return await modal.present();

}
//Profile page
async profile(){
  const modal=await this.modalController.create({
    component: ProfilepageComponent,
    cssClass:'my-custom-class'
  });
  return await modal.present();

}

  //// todoAdd ekleme

  async todoModal() {
    const modal = await this.modalController.create({
      component: TodoModalComponent,
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

/////İçerik ekle
/*
	$b_tarih=$gelen_data->b_tarih;
	$b_saat=$gelen_data->b_saat;
    	$user_id=$gelen_data->user_id;
    	$is_no=$gelen_data->is_no; // 0 veya bağlı buylundu iş id
    	$durum=0; // ilk etapta durujm 0 olacak
    	$s_user_id=$gelen_data->s_user_id;
	    $baslik=$gelen_data->baslik;
	$kategori=$gelen_data->kategori;
*/

todoDbAdd(baslik,b_tarih,b_saat,s_user_no){
    console.log(baslik+":deneme");
    let bodyTodoList = {operation_type:"insert",service_type:"todoAdd",user_id:this.user_id,baslik:baslik,is_no:0,durum:0,b_tarih:b_tarih,b_saat:b_saat,s_user_id:s_user_no};
    this.apiWeb.webService(bodyTodoList).subscribe(data=>{
          this.todoList = data;
          console.log(this.todoList);
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
                 this.tosoListAll();
                  console.log(this.todoList);
                  let baslik="Delete Remove:";
                  let mesaj="Successfully Deleted!";
                  this.apiWeb.presentToast(baslik,mesaj);
                  /// User bilgileri local hafızaya kayit işlemi yapilacak
                 // localStorage.setItem('userJSON',JSON.stringify(this.userData.data));
            })
  }

  /*
onLogin(email,password){
  let body = {operation_type:"select", service_type:"kullanici", user_email:email,user_password:password};
    this.apiWeb.webService(body).subscribe(data=>{
      this.userData = data;
      console.log(this.userData.data.no);
      this.user_id=this.userData.data.no;
    })
}

*/


doRefresh(event) {
  this.tosoListAll();


  setTimeout(() => {
    console.log('Async operation has ended');
    event.target.complete();
  }, 2000);
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
async presentToast(colour,message) {
  const toast = await this.alertController.create({
    message: message,
  });
  toast.present();
}
forgotpassword(status,email){
  if(status=='true'){
    this.forgetpassword=true;
    if(email){
    this.forgetpassword=false;
    console.log("Şifre gönderme basarılı..");
    this.presentToast('success','Mail sended!');
  }
  }else{
    this.forgetpassword=false;
  }
}
}
