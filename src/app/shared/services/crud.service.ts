import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor(private firestore: AngularFirestore) { }

  getAll(key) {
    return this.firestore.collection(key).snapshotChanges();
  }

  create(dateObject: any, key) {
    return this.firestore.collection(key).add(dateObject);
  }
  getSingle(id,key){
   return this.firestore.collection(key).doc(id).ref.get()
  }
  update(dateObject: any, key,article_id) {
    console.log(dateObject,key)
    delete dateObject.article_id;
    return this.firestore.doc(key + "/" + article_id).update(dateObject);
  }
  delete(objId: string, key) {
    return this.firestore.doc(key + "/" + objId).delete();
  }
}
