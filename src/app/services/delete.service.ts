import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { PostService } from './post.service';

@Injectable({
  providedIn: 'root'
})
export class DeleteService {
  userDelete="https://projet-integrateur-2022.herokuapp.com/api/chamis/"
  visiteDelete="https://projet-integrateur-2022.herokuapp.com/api/visite/"
  defiDelete="https://projet-integrateur-2022.herokuapp.com/api/defis/"

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-type':  'application/json'
    }),
    observe:'resposnse' as 'response'

  };
  constructor(private http : HttpClient,private post:PostService) { }

  async deleteDefi(defiId:string): Promise<boolean> {
    try {
      const R = await lastValueFrom( this.http.delete(this.defiDelete+defiId,this.httpOptions) );

      // Il faudrait vérifier qu'on reçoit bien un code HTTP 200 dans la réponse...
      if (R.status==200){
        this.post.Refreshrequired.next()//to get trigger for updating in realtime
        console.log("observable in deleting DEFI with value ",R)
        return true}
      return false
    } catch (err) {
      console.error("Error postingUsers", this.defiDelete, "\n", err);
      return false;
    }
  }
}
