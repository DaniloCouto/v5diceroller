import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { RollDetailPage } from '../roll-detail/roll-detail.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {
  normalDiceCount : number = 1;
  hungerDiceCount : number = 0;
  switchOverlapDice : boolean = true;
  successNeeded : number = 1;

  constructor(public modalController: ModalController) {}

  addNormalDiceCount(){
    this.normalDiceCount++;
  }
  decrescentNormalDiceCount(){
    if( (this.normalDiceCount - 1) < 1 ){
      this.normalDiceCount = 1;
    }else{
      this.normalDiceCount--;
    }
  }
  addSuccessNeeded(){
    this.successNeeded++;
  }
  decrescentSuccessNeeded(){
    if( (this.successNeeded - 1) < 1 ){
      this.successNeeded = 1;
    }else{
      this.successNeeded--;
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
      componentProps: { normalDiceCount: this.normalDiceCount, hungerDiceCount: this.hungerDiceCount, switchOverlapDice: this.switchOverlapDice, successNeeded: this.successNeeded  }
    });
    return await modal.present();
  }
}
