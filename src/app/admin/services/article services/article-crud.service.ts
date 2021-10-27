import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ArticleCrudService {
  private hostUrl = environment.apiUrl;
  private dbPath = '/articles';
  articlesRef: AngularFireList<any> = null;
  constructor(private db: AngularFireDatabase,
    private http: HttpClient,) {
    this.articlesRef = db.list(this.dbPath);
  }

  getAll(): AngularFireList<any> {
    return this.articlesRef;
  }

  createArticle(articleObject: any):  Observable<any> {
    return  this.http.post(
      `${this.hostUrl}/articles.json`,
        articleObject
    )
  }

  updateArtice(){

  }

  getAllArticle(): Observable<any[]> {
    return this.http.get<any[]>( `${this.hostUrl}/articles.json`)
  }
}
