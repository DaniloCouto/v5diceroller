import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-roll-detail',
  templateUrl: './roll-detail.page.html',
  styleUrls: ['./roll-detail.page.scss'],
})
export class RollDetailPage implements OnInit {

  constructor(public modalController: ModalController) {
    // componentProps can also be accessed at construction time using NavParams
  }

  close(){
    this.modalController.dismiss();
  }

  ngOnInit() {
  }

}
