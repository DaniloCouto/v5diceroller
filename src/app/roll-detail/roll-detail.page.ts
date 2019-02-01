import { Component, OnInit, Input } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';


@Component({
  selector: 'app-roll-detail',
  templateUrl: './roll-detail.page.html',
  styleUrls: ['./roll-detail.page.scss'],
})
export class RollDetailPage implements OnInit {
  @Input() normalDiceCount : number = 0;
  @Input() hungerDiceCount : number = 0;
  @Input() switchOverlapDice : boolean = true;

  normalDicesResults : Array<number> = [];
  hungerDicesResults : Array<number> = [];
  numberOfSucesses : number = 0;
  messyCritical : boolean = false;
  bestialFail : boolean = false;

  constructor(public modalController: ModalController, private platform: Platform) {
    // componentProps can also be accessed at construction time using NavParams
    this.platform.backButton.subscribe(() => {
      modalController.dismiss();
    });
  }

  close(){
    this.modalController.dismiss();
  }

  roll(){
    this.normalDicesResults = [];
    this.hungerDicesResults = [];
    this.numberOfSucesses = 0;
    this.messyCritical = false;
    this.bestialFail= false;
    let internalNormalDiceCount = this.switchOverlapDice ? ((this.normalDiceCount - this.hungerDiceCount) < 1 ? 1 : (this.normalDiceCount - this.hungerDiceCount)) : this.normalDiceCount;
    while(this.normalDicesResults.length < internalNormalDiceCount){
      let randomResult = Math.floor(Math.random() * Math.floor(10));
      this.normalDicesResults.push(randomResult);
      this.numberOfSucesses += (randomResult === 10) ? 2 : ( (randomResult >=6 ) ? 1 : 0 )
    }
    while(this.hungerDicesResults.length < this.hungerDiceCount){
      let randomResult = Math.floor(Math.random() * Math.floor(10));
      this.hungerDicesResults.push(randomResult);
      if( randomResult === 10){
        this.numberOfSucesses += 2;
        this.messyCritical = true;
      }else if ( randomResult >=6 ){
        this.numberOfSucesses++; 
      }else if ( randomResult == 1 ){
        this.bestialFail = true;
      }
    }
    console.log('Normal Dice Results:', this.normalDicesResults);
    console.log('Hunger Dice Results:', this.hungerDicesResults);
    console.log('Sucesses:', this.numberOfSucesses);
    console.log('Messy Critical?:', this.messyCritical);
    console.log('bestialFail:', this.bestialFail);
    
  }

  ngOnInit() {
    console.log('Open Modal:', this.normalDiceCount, this.hungerDiceCount, this.switchOverlapDice);
    this.roll();    
  }

}
