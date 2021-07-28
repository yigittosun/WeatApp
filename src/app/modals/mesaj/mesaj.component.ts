import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-mesaj',
  templateUrl: './mesaj.component.html',
  styleUrls: ['./mesaj.component.scss'],
})
export class MesajComponent implements OnInit {

  constructor(public modalCtrl: ModalController) { }

  ngOnInit() {

  }

  dismiss(aciklama) {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalCtrl.dismiss({
      'dismissed': true,
      'mesaj':aciklama
    });
  }


  

}
