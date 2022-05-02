import { Chami } from '../iterfaces';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  userPost="https://projet-integrateur-2022.herokuapp.com/api/chamis/"

  httpOptions = {
    headers: new HttpHeaders({
      'Content-type':  'application/json'
    })
  };


  constructor(private http : HttpClient) {
  }

  postingUsers(user:Chami){
    console.log("vnutri postingUsers")
    this.http.post(this.userPost,user,this.httpOptions).subscribe((val)=>{
      console.log("observable in postingUsers with value ",val)
    },
      response=>{
        console.log("error is posting Users ",response)
      },
      ()=>{
        console.log("observable finished")
      }
    )
  }
}
