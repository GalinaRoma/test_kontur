import { Component, OnInit, Input } from '@angular/core';
import { ScoreService } from '../score.service';

@Component({
  selector: 'app-game-end',
  templateUrl: './game-end.component.html',
  styleUrls: ['./game-end.component.css']
})
export class GameEndComponent implements OnInit {

  constructor(private scoreService: ScoreService) { 
  }

  ngOnInit() {}

}
