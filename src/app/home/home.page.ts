import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { RollDetailPage } from '../roll-detail/roll-detail.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {
  normalDiceCount : number = 0;
  hungerDiceCount : number = 0;
  switchOverlapDice : boolean = true;

  constructor(public modalController: ModalController) {}

  addNormalDiceCount(){
    this.normalDiceCount++;
  }
  decrescentNormalDiceCount(){
    if( (this.normalDiceCount - 1) < 0 ){
      this.normalDiceCount = 0;
    }else{
      this.normalDiceCount--;
    }
  }
  addHungerDiceCount(){
    this.hungerDiceCount++;
  }
  decrescentHungerDiceCount(){
    if( (this.hungerDiceCount - 1) < 0 ){
      this.hungerDiceCount = 0;
    }else{
      this.hungerDiceCount--;
    }
  }
  async presentModal() {
    const modal = await this.modalController.create({
      component: RollDetailPage,
      componentProps: { normalDiceCount: this.normalDiceCount, hungerDiceCount: this.hungerDiceCount, switchOverlapDice: this.switchOverlapDice  }
    });
    return await modal.present();
  }
}
