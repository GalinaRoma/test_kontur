import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RandomUtilsModule } from '../random-utils.module';
import { ScoreService } from '../score.service';


@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.css']
})
export class GameBoardComponent implements OnInit {

  currentScore;
  settings;
  playCards;
  openedCards = [];
  сlosedPairsCount;
  gameStarted = false;

  constructor(private router: Router, private random: RandomUtilsModule, 
    private scoreService: ScoreService) {
      this.settings = {
        cardsCount: 18,
        pairsCount: 9,
        factor: 42
      }
      this.playCards = Array(this.settings.cardsCount);
      this.сlosedPairsCount = this.settings.pairsCount;
  }

  ngOnInit() {
    this.startGame();
  }

  onSelect(selectedCard) {
    if (this.gameStarted && this.openedCards.length < 2) {
      this.preprocessCard(selectedCard);
    }
  }

  startGame() {
    this.createGameBoard();
    this.currentScore = 0;
    setTimeout(() => this.closeCards(), 5000);
  }

  createGameBoard() {
    const occupied = [];
    const playCardsNames = this.chooseCardsForPlay();
    for (let i = 0; i < this.settings.pairsCount; i++) {
      const currentCardName = playCardsNames.pop();
      this.putCardOnBoard(currentCardName, occupied);
      this.putCardOnBoard(currentCardName, occupied);
    }
  }

  chooseCardsForPlay() {
    const cardsNames = [];
    for (let i = 0; i < this.settings.pairsCount; i++) {
      let newCardName = this.random.randomCardName();
      while (cardsNames.includes(newCardName)) {
        newCardName = this.random.randomCardName();
      }
      cardsNames.push(newCardName);
    }
    return cardsNames;
  }

  putCardOnBoard(card, occupied) {
    let randNumber = this.random.randomInteger(0, this.settings.cardsCount);
    while (occupied.includes(randNumber)) {
      randNumber = this.random.randomInteger(0, this.settings.cardsCount);
    }
    this.playCards[randNumber] = {
      name: card,
      number: randNumber
    };
    occupied.push(randNumber);
  }

  closeCards() {
    for (let card of this.playCards) {
      this.closeCard(card);
    }
    this.gameStarted = true;
  }

  closeCard(card) {
    const elem = document.getElementsByClassName('card')[card.number];
    elem.setAttribute('src', 'assets/back-card.png');
    elem.setAttribute('data-tid', "Card");
  }

  preprocessCard(selectedCard) {
    this.openCard(selectedCard);
    this.openedCards.push(selectedCard);
    setTimeout(() => this.processPair(), 1500);
  }

  openCard(card) {
    const name = `assets/cards/${card.name}.png`;
    document.getElementsByClassName('card')[card.number].setAttribute('src', name);
  }

  processPair() {
    if (this.openedCards.length !== 2)
      return;
    const first = this.openedCards.pop();
    const second = this.openedCards.pop();
    if (first.name === second.name && first.number !== second.number) {
      this.hideCard(first);
      this.hideCard(second);
      this.сlosedPairsCount -= 1;
      this.currentScore += this.сlosedPairsCount * this.settings.factor;
      if (this.сlosedPairsCount === 0) this.endGame();
    }
    else {
      this.closeCard(first);
      this.closeCard(second);
      this.currentScore -= (this.settings.pairsCount - this.сlosedPairsCount) * this.settings.factor;
    }
  }

  hideCard(card) {
    document.getElementsByClassName('card')[card.number].classList.add('hidden-elem');
  }


  endGame() {
    this.scoreService.score = this.currentScore;
    this.router.navigateByUrl('/end');
  }
}
