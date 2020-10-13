import {Component, Input} from '@angular/core';
import {Router} from '@angular/router';

@Component({
    selector: 'app-refresh-component',
    templateUrl: './refresh-component.component.html',
    styleUrls: ['./refresh-component.component.scss']
})
export class RefreshComponentComponent {
  @Input() pageUrl: string;
    constructor(
      private router: Router
    ){}
  reloadPage() {
      this.router.navigate([this.pageUrl]);
  }
}
