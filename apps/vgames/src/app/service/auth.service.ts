import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFireAuth } from '@angular/fire/auth';

import { GameService } from './game-service.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<any>;

  constructor(private afAuth: AngularFireAuth,
    private router: Router,
    private gs: GameService) { 

    this.user$ = this.afAuth.authState;
    this.user$.subscribe(user => {
      if (user) {
        this.gs.setauthUid(user.uid);
        this.router.navigateByUrl("home");
      } else {
        this.gs.setauthUid(null);
        this.router.navigateByUrl("");
      }
    })
  }

  async signIn(email: string, password: string) {
    await this.afAuth.signInWithEmailAndPassword(email, 
                        password);
  }

  async signOut() {
    await this.afAuth.signOut();
  }

}
