import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'casc8-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'vgames';

  constructor(private router: Router) {

  }

  goHome() {
    this.router.navigateByUrl('/');
  }
}
