import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private router: Router) { 

  }

  doSignIn() {

  }  

  signOut() {
    this.router.navigateByUrl("");
  }
  
}
