import { Observable, throwError } from 'rxjs';
import { Defi } from './../iterfaces';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class DefisService {
  defiUrl = 'https://projet-integrateur-2022.herokuapp.com/api/defis/'


  constructor(private http: HttpClient) { }

  createDefi(defi : Defi): Promise<Defi> {

    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache'
    });

    return this.http.post(this.defiUrl, defi, {headers : httpHeaders}).toPromise()
    .then(this.data)

  }

  private data(res: any) {
    let body = res;
    return body;
  }

}
