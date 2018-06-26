import { Component } from '@angular/core';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html?v=${new Date().getTime()}',
  styleUrls: ['./app.component.css?v=${new Date().getTime()}']
})
export class AppComponent {
  user:string;
  pass:string;

  constructor(public data:DataService) { }

  onOkClick(): void {
    this.data.login(this.user, this.pass, (success:boolean) => {
      if(success){
        this.data.getPredictions();
      }
    });
  }
}
