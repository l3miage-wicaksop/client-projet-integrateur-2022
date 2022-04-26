import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Chamis,Chami } from './iterfaces';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  apiUsers:string ="https://projet-integrateur-2022.herokuapp.com/api/chamis/"
  apiUsersJson:Object|undefined
  apiUsersObs:Observable<Object>|undefined
  allUsers:Chamis={all:[]}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-type':  'application/json'
    })
  };

  constructor(private http : HttpClient) {}



  async getResponse(){
    return new Promise((resolve,err)=>{
      try{
      this.http.get(this.apiUsers).subscribe((data)=>{
        resolve(data)
      })
    }
    catch(exception){
      err(exception)
    }
    })
  }


  async checkExistingUser(name: string)
  {
    await this.getResponse().then((val)=>{
      this.allUsers={all:val as Chami[]}
      }).catch((val)=>console.log("Error in httpResponse ",val)
      )
    const iterationEl=0
    while(iterationEl<this.allUsers.all.length){
      if(this.allUsers.all[iterationEl].login===name)
        return true
    }
    return false
  }
}
