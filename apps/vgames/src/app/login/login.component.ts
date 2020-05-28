import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { GameService } from '../service/game-service.service';

@Component({
  selector: 'casc8-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;

  constructor(private router: Router,
    private gs: GameService) { 
    this.email = "m@m";
    this.password = "";
  }

  ngOnInit(): void {
  }

  doLogin() {
    console.log(this.email, this.password);
    this.gs.signIn(this.email, this.password);
    this.router.navigateByUrl("home");
  }

}
