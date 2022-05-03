import { Defi } from './../iterfaces';
import { Chami, Visite } from '../iterfaces';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  userPost="https://projet-integrateur-2022.herokuapp.com/api/chamis/"
  userVisite="https://projet-integrateur-2022.herokuapp.com/api/visite/"
  userDefi="https://projet-integrateur-2022.herokuapp.com/api/defis/"

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


  postingVisite(visite:Visite){
    console.log("vnutri postingVisite")
    this.http.post(this.userVisite,visite,this.httpOptions).subscribe((val)=>{
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

  postingDefi(defi:Defi){
    console.log("vnutri postingDefi")
    this.http.post(this.userDefi,defi,this.httpOptions).subscribe((val)=>{
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
