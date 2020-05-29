import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../service/auth.service';

@Component({
  selector: 'casc8-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string;
  password: string;

  constructor(private router: Router,
    private auth: AuthService) { 
    this.email = "";
    this.password = "";
  }

  doLogin() {
    console.log(this.email, this.password);
    this.auth.signIn(this.email, this.password);
  }

}
