import { Defi } from './../iterfaces';
import { Chami, Visite } from '../iterfaces';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom, Subject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  userPost="https://projet-integrateur-2022.herokuapp.com/api/chamis/"
  visitePost="https://projet-integrateur-2022.herokuapp.com/api/visite/"
  defiPost="https://projet-integrateur-2022.herokuapp.com/api/defis/"

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-type':  'application/json'
    }),
    observe:'resposnse' as 'response'

  };


  constructor(private http : HttpClient) {
  }

  private _refreshrequired = new Subject<void>();

  get Refreshrequired() {
    return this._refreshrequired;
  }

  postingUsers(user:Chami){
    console.log("vnutri postingUsers")
    this.http.post(this.userPost,user,this.httpOptions).pipe(
      tap(()=>{
      this.Refreshrequired.next()
    })
    )
  }


  async postingUsersPromise(user:Chami): Promise<boolean> {
    try {
      const R = await lastValueFrom( this.http.post(this.userPost,user,this.httpOptions) );
      // Il faudrait vérifier qu'on reçoit bien un code HTTP 200 dans la réponse...
      if(R.status==200){
        this.Refreshrequired.next()//to get trigger for updating in realtime
        console.log("observable in postingUsers with value ",R)
        return true}
      return false
    } catch (err) {
      console.error("Error postingUsers", user, "\n", err);
      return false;
    }
  }



  postingVisite(visite:Visite){
    console.log("vnutri postingVisite")
    this.http.post(this.visitePost,visite,this.httpOptions).subscribe((val)=>{
      console.log("observable in postingVisite with value ",val)
    },
      response=>{
        console.log("error is posting Visite ",response)
      },
      ()=>{
        console.log("observable finished")
      }
    )
  }

  async postingDefiPromise(defi:Defi): Promise<boolean> {
    try {
      let R = await lastValueFrom( this.http.post(this.defiPost,defi,this.httpOptions) );
      // Il faudrait vérifier qu'on reçoit bien un code HTTP 200 dans la réponse...

      if(R.status==200){
        this.Refreshrequired.next()
        console.log("observable in postingDefi with value ",R)
        return true}
      return false
    } catch (err) {
      console.error("Error postingUsers", defi, "\n", err);
      return false;
    }
  }

  async postingVisitePromise(visite:Visite): Promise<boolean> {
    try {
      const R = await lastValueFrom( this.http.post(this.visitePost,visite,this.httpOptions) );
      // Il faudrait vérifier qu'on reçoit bien un code HTTP 200 dans la réponse...
      if(R.status==200){
        this.Refreshrequired.next()
        console.log("observable in postingVisite with value ",R)
        return true}
      return false
    } catch (err) {
      console.error("Error postingUsers", visite, "\n", err);
      return false;
    }
  }

  postingDefi(defi:Defi){
    console.log("vnutri postingDefi")
    this.http.post(this.defiPost,defi,this.httpOptions).subscribe((val)=>{
      console.log("observable in postingDefi with value ",val)
    },
      response=>{
        console.log("error is posting Defi ",response)
      },
      ()=>{
        console.log("observable finished")
      }
    )
  }


}
