import { Component, OnInit, Input } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-roll-detail',
  templateUrl: './roll-detail.page.html',
  styleUrls: ['./roll-detail.page.scss'],
})
export class RollDetailPage implements OnInit {
  @Input() normalDiceCount : number = 1;
  @Input() hungerDiceCount : number = 0;
  @Input() switchOverlapDice : boolean = true;
  @Input() successNeeded : number = 1;

  normalDicesResults : Array<number> = [];
  hungerDicesResults : Array<number> = [];
  numberOfSucesses : number = 0;
  rollSuccess : boolean = false;  
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
    let possibleMessyCrit = false;
    let criticalCount = 0;
    let possibleBeastialFail = false;
    let hungerBeastFailCount = 0;
    while(this.normalDicesResults.length < internalNormalDiceCount){
      let randomResult = Math.floor(Math.random() * Math.floor(10))+1;
      this.normalDicesResults.push(randomResult);
      this.numberOfSucesses += (randomResult >=6 ) ? 1 : 0;
      if(randomResult == 10 ){
        criticalCount++;
      }
    }
    while(this.hungerDicesResults.length < this.hungerDiceCount){
      let randomResult = Math.floor(Math.random() * Math.floor(10))+1;
      this.hungerDicesResults.push(randomResult);
      if( randomResult === 10){
        this.numberOfSucesses ++;
        possibleMessyCrit = true;
        if(randomResult == 10 ){
          criticalCount++;
        }
      }else if ( randomResult >=6 ){
        this.numberOfSucesses++; 
      }else if ( randomResult == 1 ){
        possibleBeastialFail = true;
      }
    }
    this.numberOfSucesses += Math.floor( criticalCount  / 2) * 2;
    this.rollSuccess = (this.numberOfSucesses >= this.successNeeded);
    this.messyCritical = (possibleMessyCrit && criticalCount >= 2 && this.rollSuccess);
    this.bestialFail = (!this.rollSuccess && possibleBeastialFail);

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
