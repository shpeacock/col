import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs';

@Injectable()
export class AnswerService {

  constructor(private _http:Http) { }

  create(answer){
    return this._http.post('/answers', answer).map(data => data.json()).toPromise()
  }
  increaseLikes(id, idx){
    return this._http.put(`/answers/${id}`, {}).map(data=> data.json()).toPromise();
  }
  deleteAnswer(id, idx){
      return this._http.delete(`/answers/${id}`, {}).map(data=>data.json()).toPromise();
  }
}
