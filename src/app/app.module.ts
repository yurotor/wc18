import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { GamesComponent } from './games/games.component';
import { StandingsComponent } from './standings/standings.component';
import { GameComponent } from './game/game.component';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

const routes: Routes = [
  { path: '', component: GamesComponent },
  { path: 'games', component: GamesComponent },
  { path: 'standings', component: StandingsComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    GamesComponent,
    StandingsComponent,
    GameComponent    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    BrowserAnimationsModule,
    NoopAnimationsModule    
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
