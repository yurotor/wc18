import { Component } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html'
})
export class GamesComponent {

  constructor(public data:DataService) { }

}
