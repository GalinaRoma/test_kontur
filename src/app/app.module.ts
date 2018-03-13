import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ScoreService } from './score.service';

import { AppComponent } from './app.component';
import { GameStartComponent } from './game-start/game-start.component';
import { GameBoardComponent } from './game-board/game-board.component';
import { GameEndComponent } from './game-end/game-end.component';
import { GameRoutingModule } from './/game-routing.module';
import { RandomUtilsModule } from './/random-utils.module';


@NgModule({
  declarations: [
    AppComponent,
    GameStartComponent,
    GameBoardComponent,
    GameEndComponent
  ],
  imports: [
    BrowserModule,
    GameRoutingModule,
    RandomUtilsModule
  ],
  providers: [ScoreService],
  bootstrap: [AppComponent]
})
export class AppModule { }
