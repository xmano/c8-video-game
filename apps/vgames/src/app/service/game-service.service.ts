import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { map } from 'rxjs/operators';
import { VideoTitle } from '../model/model';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  authUser: any;

  constructor(private afs: AngularFirestore) { 

  }

  /**
   * Helper function to cache the uid.
   * @param uid : User uid of logged in user.
   */
  setauthUid(uid: string) {
    this.authUser = uid;
    return true;
  }

  /**
   * Fetches all the Game Titles available in the store.
   */  
  fetchTitles() {
    let obs = this.afs.collection("titles", ref => ref.orderBy('by', 'asc'))
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
   *   if doc.id is "", adds the new title.
   * @param doc : details of video title;
   *    doc properties expected to be valid on entry.
   */  
  async updateTitle(doc: VideoTitle) {
    let update = true;
    let docRef = doc.id;
    if (docRef === "") {
      //Adding the new video game title.
      docRef = await this.afs.createId();
      doc.by = this.authUser;
      update = false;
    } else {
      if (doc.by != this.authUser) {
        return false;
      }
    }

    (doc.id) || (delete doc.id);
    if (update) {
      await this.afs.doc(`/titles/${docRef}`)
            .update(doc);
    } else {
      await this.afs.doc(`/titles/${docRef}`)
            .set(doc, {merge: true});      
    }
  }

  /**
   * Deletes the gameTitle in the backend
   * based on the id.
   * @param doc : details of video title
   */
  async deleteTitle(doc: VideoTitle) {
    if (doc.by != this.authUser) {
      return false;
    }
    const path = `/titles/${doc.id}`;
    await this.afs.doc(path).delete();
  }
}
