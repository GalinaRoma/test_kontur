import { Injectable } from '@angular/core';

@Injectable()
export class ScoreService {

  private _score: Number;
  constructor() { }

  get score(): Number {
    return this._score;
  }

  set score(value: Number) {
    this._score = value;
  }
}
