import { createServiceFactory, SpectatorService } from '@ngneat/spectator/jest';
import { AngularFirestore } from '@angular/fire/firestore';

import { GameService } from './game-service.service';
import { VideoTitle } from '../model/model';

describe('GameService', () => {
  let spectator: SpectatorService<GameService>;

  const createService = createServiceFactory({
    service: GameService,
    providers: [],
    entryComponents: [],
    mocks: [
      AngularFirestore
    ]
  });

  beforeEach(() => {
    spectator = createService()
  });

  test('should be created', async () => {
    expect(spectator.service).toBeTruthy();
  });

  test('adds a video title if logged in', async () => {
    let doc:VideoTitle = {id: "", by: "123", title: "A", desc: "BS"};
    expect(spectator.service.setauthUid("123")).toBeTruthy();

    const afs = spectator.get<AngularFirestore>(AngularFirestore);
    const spyCreate = spyOn(afs, "createId");
    const spyDoc = spyOn(afs, "doc");
    spyDoc.and.returnValue({set: () => true})
    await spectator.service.updateTitle(doc);
    expect(spyCreate).toHaveBeenCalled();
    expect(spyDoc).toHaveBeenCalled();
  });  

  test('updates video title if owner', async () => {
    let doc:VideoTitle = {id: "12345", by: "123", title: "A", desc: "BS"};
    expect(spectator.service.setauthUid("123")).toBeTruthy();

    const afs = spectator.get<AngularFirestore>(AngularFirestore);
    const spyCreate = spyOn(afs, "createId");
    const spyDoc = spyOn(afs, "doc");
    spyDoc.and.returnValue({update: () => true})
    await spectator.service.updateTitle(doc);
    expect(spyDoc).toHaveBeenCalled();
    });

  test('does not update video title if not the owner', async () => {
    let doc:VideoTitle = {id: "12345", by: "123", title: "A", desc: "BS"};
    expect(spectator.service.setauthUid("999")).toBeTruthy();

    const afs = spectator.get<AngularFirestore>(AngularFirestore);
    const spyCreate = spyOn(afs, "createId");
    const spyDoc = spyOn(afs, "doc");
    spyDoc.and.returnValue({set: () => true})
    //await spectator.service.updateTitle(doc);
    await expect(spectator.service.updateTitle(doc))
          .resolves.toBeFalsy();    
    expect(spyCreate).not.toHaveBeenCalled();
    expect(spyDoc).not.toHaveBeenCalled();
  });

  test('deletes video title if owner', async () => {
    let doc:VideoTitle = {id: "12345", by: "123", title: "A", desc: "BS"};
    expect(spectator.service.setauthUid("123")).toBeTruthy();

    const path = `/titles/${doc.id}`;
    const afs = spectator.get<AngularFirestore>(AngularFirestore);
    const spy = spyOn(afs, "doc");
    spy.and.returnValue({delete: () => true})
    spectator.service.deleteTitle(doc);
    expect(spy).toHaveBeenCalled();
  });

  test('does not delete video title if not the owner',async () => {
    let doc:VideoTitle = {id: "12345", by: "123", title: "A", desc: "BS"};
    expect(spectator.service.setauthUid("999")).toBeTruthy();

    const path = `/titles/${doc.id}`;
    const afs = spectator.get<AngularFirestore>(AngularFirestore);
    const spy = spyOn(afs, "doc");
    spy.and.returnValue({delete: () => true})
    await expect(spectator.service.deleteTitle(doc))
          .resolves.toBeFalsy();
    expect(spy).not.toHaveBeenCalled();
  });

});
