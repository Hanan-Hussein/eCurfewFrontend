import {Component} from '@angular/core';
import {navItems} from '../../_nav';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent {
  public sidebarMinimized = false;
  public navItems = navItems;
  username: string;

  constructor(
    private route: Router,
  ) {
    this.username = localStorage.getItem('username');
    const role = localStorage.getItem('USER_ROLE');
    // if (role === 'ADMIN') {
    //   this.navItems = admItems;
    // } else {
    //   this.navItems = navItems;
    // }
  }

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }

  onLogOut() {
    localStorage.clear();
    this.route.navigate(['/login']);
  }
}
