import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-todo-modal',
  templateUrl: './todo-modal.component.html',
  styleUrls: ['./todo-modal.component.scss'],
})
export class TodoModalComponent implements OnInit {

is_no: string;
public personelList:any;
  
  constructor(public modalCtrl: ModalController) { }

  ngOnInit() {

    console.log(this.is_no+"::::::");
    this.personelList = JSON.parse(localStorage.getItem('personelJSON'));

  }


  dismiss(baslik,b_tarih,b_saat,user_data) {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data

    
    this.modalCtrl.dismiss({
      'dismissed': true,
      aData:baslik,
      bData:b_tarih,
      cData:b_saat,
      user_data:user_data
    });
  }


  // icerik ekle
  todoAdd(baslik,b_tarih,b_saat,user_data){
    console.log(user_data);
    this.dismiss(baslik,b_tarih,b_saat,user_data);

  } 

}
