import { Component, OnInit } from '@angular/core';
import { faTelegram } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
fatel=faTelegram;
  constructor() { }

  ngOnInit(): void {
  }

}
