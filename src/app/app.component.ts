import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ayo';
  movie: string = '';
  setmovieName($event: { name: string; }) {
  	this.movie = $event.name;
  }

  
}
