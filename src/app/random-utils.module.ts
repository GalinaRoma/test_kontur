import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: []
})
export class RandomUtilsModule {

  randomInteger(min, max) {
    return Math.floor(min + Math.random() * (max - min));
  }

  randomCardName() {
    const dignities = ['0', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'J', 'Q', 'K'];
    const suits = ['C', 'D', 'H', 'S'];
    const randNumber = this.randomInteger(0, 13);
    const randLetter = this.randomInteger(0, 4);
    return dignities[randNumber] + suits[randLetter];
  }
}
