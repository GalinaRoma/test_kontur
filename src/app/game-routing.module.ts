import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { GameStartComponent } from './game-start/game-start.component';
import { GameEndComponent } from './game-end/game-end.component';
import { GameBoardComponent } from './game-board/game-board.component';

const appRoutes: Routes = [
  {path: '', redirectTo: '/start', pathMatch: 'full'},
  {path: 'start', component: GameStartComponent},
  {path: 'end', component: GameEndComponent},
  {path: 'game', component: GameBoardComponent}
]

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  declarations: [],
  exports: [ RouterModule ]
})
export class GameRoutingModule { }
