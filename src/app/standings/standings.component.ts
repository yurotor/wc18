import { Component } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-standings',
  templateUrl: './standings.component.html'
})
export class StandingsComponent {
  constructor(public data:DataService) { }

}
