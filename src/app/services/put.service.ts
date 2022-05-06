import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Chami } from '../iterfaces';
import { PostService } from './post.service';

@Injectable({
  providedIn: 'root'
})
export class PutService {
  userPut="https://projet-integrateur-2022.herokuapp.com/api/chamis/"
  visitePut="https://projet-integrateur-2022.herokuapp.com/api/visite/"
  defiPut="https://projet-integrateur-2022.herokuapp.com/api/defis/"

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-type':  'application/json'
    }),
    observe:'resposnse' as 'response'

  };

  constructor(private http : HttpClient,private post:PostService) //its gonna be more simple if we just goint to trigger the post subject to update info
  { }

  async updateUser(userLogin:string,toUpdate:any): Promise<boolean> {
    try {
      const R = await lastValueFrom( this.http.post(this.userPut+userLogin,toUpdate,this.httpOptions) );
      // Il faudrait vérifier qu'on reçoit bien un code HTTP 200 dans la réponse...
      if(R.status==200){
        this.post.Refreshrequired.next()//to get trigger for updating in realtime
        console.log("observable in postingUsers with value ",R)
        return true}
      return false
    } catch (err) {
      console.error("Error postingUsers", userLogin, "\n", err);
      return false;
    }
  }
}
