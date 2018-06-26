import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { DatePipe } from '@angular/common';
import { DataService } from '../data.service';
import { Observable, Subscription } from 'rxjs';
import { interval } from 'rxjs';
import { map } from 'rxjs/operators'

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html'
})
export class GameComponent implements OnInit, OnDestroy {
  @Input('game')
  game:any;
  isMouseOver:boolean;
  score1:number=0;
  score2:number=0;

    private counter$: Observable<number>;
    private subscription: Subscription;
    private message: string;
  
  constructor(
    public data:DataService,
    private datePipe: DatePipe) { }

  dhms(t) {
    var days, hours, minutes, seconds;
    days = Math.floor(t / 86400);
    t -= days * 86400;
    hours = Math.floor(t / 3600) % 24;
    t -= hours * 3600;
    minutes = Math.floor(t / 60) % 60;
    t -= minutes * 60;
    seconds = t % 60;

    return [
        days + 'd',
        hours + 'h',
        minutes + 'm',
        seconds + 's'
    ].join(' ');
  }

  ngOnInit() {
    this.counter$ = interval(1000).pipe(
      map((x) => { 
        return Math.floor((new Date(this.game.MatchTime).getTime() - new Date().getTime()) / 1000); 
    }));
      
    this.subscription = this.counter$.subscribe((x) => this.message = this.dhms(x));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getImg(team:string):string{
    return `../../wc18/assets/${team.toLowerCase().replace(' ','-')}.png`;
  }

  predict(){
    this.data.editingGame=this.game;
    // this.score1=this.game.prediction.Score1;
    // this.score2=this.game.prediction.Score2;
  }

  get isEditable():boolean{
    return this.isMouseOver &&
          new Date(this.game.MatchTime)>new Date() &&
          this.data.loginInfo;
  }

  get isFuture():boolean{
    return new Date(this.game.MatchTime)>new Date();
  }

  mouseEnter(game : any){
    this.isMouseOver=true;
    // console.log("mouse enter : " + game.Team1+"-"+game.Team2);
  }

  mouseLeave(game : any){
    this.isMouseOver=false;
    // console.log('mouse leave :' + game.Team1+"-"+game.Team2);
  }

  // get score1():number{
  //   return this.data.editingGame.Score1;
  // }
  // get score2():number{
  //   return this.data.editingGame.Score2;
  // }

  predictionOf(game:any):string{
    if(!this.game.prediction){
      return "";
    }
    return `I predicted: ${this.game.Team1} ${this.game.prediction.Score1} - ${this.game.prediction.Score2} ${this.game.Team2} 
            on ${this.datePipe.transform(game.prediction.PredictTime, 'dd-MM')}`;
  }

  onOkClick(){
    this.data.predict(this.data.editingGame.ID, this.score1, this.score2, (success:boolean) => {
      // this.data.editingGame={Score1:0,Score2:0};
      this.score1=0;
      this.score2=0;
    });
  }
}
