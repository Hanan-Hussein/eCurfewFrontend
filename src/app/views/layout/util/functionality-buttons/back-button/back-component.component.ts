import {Component} from '@angular/core';
import {Location} from '@angular/common';

@Component({
  selector: 'app-back-component',
  templateUrl: './back-component.component.html',
  styleUrls: ['./back-component.component.scss']
})
export class BackComponentComponent {

  constructor(
    private location: Location
  ) {
  }

  backClicked() {
    this.location.back();
  }
}
