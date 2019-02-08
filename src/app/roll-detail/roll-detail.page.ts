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
  willpowerActive : boolean = false;
  selectedDices : Array<number> = [];

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
        hungerBeastFailCount++;
      }
    }
    this.numberOfSucesses += Math.floor( criticalCount  / 2) * 2;
    this.rollSuccess = (this.numberOfSucesses >= this.successNeeded);
    this.messyCritical = (possibleMessyCrit && criticalCount >= 2 && this.rollSuccess);
    this.bestialFail = (!this.rollSuccess && hungerBeastFailCount > 1);
  }

  useWillpower(){
    this.willpowerActive = true;
  }

  selectNormalDiceForReroll(index : number){
    
    let indexOfDice = this.selectedDices.indexOf(index);
    if(this.selectedDices.length < 3 ){
      if(indexOfDice > -1){
        this.selectedDices.splice(indexOfDice, 1);
      }else{
        this.selectedDices.push(index);
      }
    }else{
      if(indexOfDice > -1){
        this.selectedDices.splice(indexOfDice, 1);
      }
    }
    console.log('dice index array after', this.selectedDices)
  }

  rollClass(value : number){
    if(value === 1){
      return 'fail';
    }else if( value === 10){
      return 'success';
    }else if( value < 6){
      return 'normal-fail';
    }
    return 'normal-success';
  }

  selectDiceClass( index: number){
    if(this.selectedDices.length <= 3 && this.willpowerActive){
      if( this.selectedDices.indexOf(index) != -1){
        return 'dice-selected';
      }
      return 'dice-selectable';
    }
  }

  reroll(){
    this.numberOfSucesses = 0;
    this.messyCritical = false;
    this.bestialFail= false;

    let possibleMessyCrit = false;
    let criticalCount = 0;
    let possibleBeastialFail = false;
    let hungerBeastFailCount = 0;

    this.selectedDices.forEach(index => {
      let randomResult = Math.floor(Math.random() * Math.floor(10))+1;
      this.normalDicesResults[index] = randomResult;
    });
    this.normalDicesResults.forEach(result => {
      this.numberOfSucesses += (result >=6 ) ? 1 : 0;
      if(result == 10 ){
        criticalCount++;
      }
    });
    this.hungerDicesResults.forEach(result => {
      if( result === 10){
        this.numberOfSucesses++;
        possibleMessyCrit = true;
        if(result == 10 ){
          criticalCount++;
        }
      }else if ( result >=6 ){
        this.numberOfSucesses++; 
      }else if ( result == 1 ){
        hungerBeastFailCount++;
      }
    });
    this.numberOfSucesses += Math.floor( criticalCount  / 2) * 2;
    this.rollSuccess = (this.numberOfSucesses >= this.successNeeded);
    this.messyCritical = (possibleMessyCrit && criticalCount >= 2 && this.rollSuccess);
    this.bestialFail = (!this.rollSuccess && hungerBeastFailCount > 1);
    this.willpowerActive = false;
    this.selectedDices = [];
  }

  ngOnInit() {
    this.roll();    
  }

}
