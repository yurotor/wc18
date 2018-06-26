import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  baseUrl:string=`http://131.1.5.114/wc18srv/api`;
  //`http://localhost:50271/api`;
  //`http://131.1.5.114/wc18srv/api`;

  games:any[];
  standings:any[];
  loginInfo:any=null;
  editingGame:any={Score1:0,Score2:0};
  predictions:any[];

  constructor(private http: HttpClient) { 
    // this.login('Eli','rm13',(success)=>{});
    this.getGames();
    this.getStandings();
  }

  get isLoggedIn():boolean{
    return this.loginInfo;
  }

  login(user:string,pass:string,callback: (success: boolean)=>void){
    this.http.get(`${this.baseUrl}/Login?user=${user}&pass=${pass}`).subscribe((i:any)=>
    {
      let li = JSON.parse(i);
      if(li.Token)
        this.loginInfo=li;
      else
        this.loginInfo=null;
      callback(this.loginInfo);
      this.getPredictions();
    });
  }

  logout(){
    this.loginInfo=null;
    this.predictions=null;
  }

  getGames(){
    this.http.get(`${this.baseUrl}/Games`).subscribe((i:any)=>{
      this.games=JSON.parse(i);
      this.getPredictions();
    });
  }

  getStandings(){    
    this.http.get(`${this.baseUrl}/Standings`).subscribe((i:any)=>this.standings=JSON.parse(i));
  }

  predict(mid:number,score1:number,score2:number,callback: (success: boolean)=>void){
    this.http.get(`${this.baseUrl}/Games?uid=${this.loginInfo.ID}&token=${this.loginInfo.Token}&mid=${mid}&score1=${score1}&score2=${score2}`).subscribe((i:any)=>
    {
      let li = JSON.parse(i);
      callback(li.error==0);   
      this.getPredictions();   
    });
  }

  getPredictions(){
    if(!this.loginInfo)
      return;
    this.http.get(`${this.baseUrl}/Games?uid=${this.loginInfo.ID}&token=${this.loginInfo.Token}`).subscribe((i:any)=>{
      let li = JSON.parse(i);
      if(!li.error)
        this.predictions=li;
        this.setGamePredictions();
    });
  }

  setGamePredictions(){
    if(!this.games||!this.predictions)
      return;
    for(let i=0;i<this.games.length;i++){
      let pr = this.predictions.find(p=>
        p.MatchID==this.games[i].ID
      );
      this.games[i].prediction=pr;
    }
  }
}

