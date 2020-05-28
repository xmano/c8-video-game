import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

import { Observable } from 'rxjs';
import { map, tap, scan, mergeMap, throttleTime } from 'rxjs/operators';
import { VideoTitle } from '../model/model';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  authUser: any;
  user$: Observable<any>;

  constructor(private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router) { 

    // Get the auth state, then fetch the Firestore user document or return null
    this.user$ = this.afAuth.authState;
    this.user$.subscribe(user => {
      if (user) {
        this.authUser = user.uid;
        this.router.navigateByUrl("home");
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

  fetchTitles1() {
    return [
      {
        title: "test",
        desc: "Awesome test"
      },
      {
        title: "test1",
        desc: "Awesome test1"
      }
    ];
  }  

  /**
   * Fetches all the Game Titles available in the store.
   */  
  fetchTitles() {
    //return [];

    let obs = this.afs.collection("titles")
    .snapshotChanges()
    .pipe(
      map(actions => {
        return actions.map(a => {
          const data: Object = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
    return obs;
  }

  /**
   * Adds / Updates the gameTitle in the backend
   * @param doc : details of video title
   */  
  async updateTitle(doc: VideoTitle) {
    let docRef = doc.id;
    if (docRef === "") {
      //Adding the new video game title.
      docRef = await this.afs.createId();
      doc.by = this.authUser;
    }

    await this.afs.doc(`/titles/${docRef}`)
          .set(doc, {merge: true});
  }

  /**
   * Deletes the gameTitle in the backend
   * based on the id.
   * @param doc : details of video title
   */
  async deleteTitle(doc: VideoTitle) {
    if (doc.by != this.authUser) {
      return;
    }

    await this.afs.doc(`/titles/${doc.id}`).delete();
  }
  
}
