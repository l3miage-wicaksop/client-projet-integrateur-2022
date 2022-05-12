import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
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
      let temp=""
      for(let i=0;i<userLogin.length;i++){
        if(userLogin[i]===' '){
          temp+='%20'
        }
        else
          temp+=userLogin[i]
      }
      const t={login:toUpdate.login,description:toUpdate.description,age:toUpdate.age,nom:toUpdate.nom,pointTotal:toUpdate.pointTotal,prenom:toUpdate.prenom,ville:toUpdate.ville}
      this.http.put(this.userPut+temp,t).subscribe(
        result=>{
          this.post.Refreshrequired.next()
          return true
      },err=>{return false})//not 200
      // const R = await lastValueFrom( this.http.put(this.userPut+temp,toUpdate,this.httpOptions) );

      // // Il faudrait vérifier qu'on reçoit bien un code HTTP 200 dans la réponse...
      // if(R.status==200){
      //   this.post.Refreshrequired.next()//to get trigger for updating in realtime
      //   console.log("observable in PUTINTG USER with value ",R)
      //   return true}
      return false
    } catch (err) {
      console.error("Error postingUsers", userLogin, "\n", err);
      return false;
    }
  }

  async updateDefi(defiId:string,toUpdate:any): Promise<boolean> {
    try {
      const R = await lastValueFrom( this.http.put(this.defiPut+defiId,toUpdate) )
      //httpOption gives un error
      // Il faudrait vérifier qu'on reçoit bien un code HTTP 200 dans la réponse...
      if(R){
        this.post.Refreshrequired.next()//to get trigger for updating in realtime
        console.log("observable in PUTING DEFI with value ",R)
        return true}
      return false
    } catch (err) {
      console.error("Error postingUsers", this.defiPut, "\n", err);
      return false;
    }
  }
}