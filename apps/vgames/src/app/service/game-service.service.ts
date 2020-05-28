import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFireAuth } from '@angular/fire/auth';

import { Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class GameService {
  authUser: any;
  user$: Observable<any>;

  constructor(private afAuth: AngularFireAuth,
      private router: Router) { 

    // Get the auth state, then fetch the Firestore user document or return null
    this.user$ = this.afAuth.authState;
    this.user$.subscribe(user => {
      if (user) {
        this.authUser = user;
        this.router.navigateByUrl("prod");
      } else {
        this.authUser = null;
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
