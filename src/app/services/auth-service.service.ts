import { PutService } from './put.service';
import { Injectable, Input } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import { Chami, Defi } from '../iterfaces';
import { lastValueFrom, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  apiUsers:string ="https://projet-integrateur-2022.herokuapp.com/api/chamis/"
  apiDefis:string ="https://projet-integrateur-2022.herokuapp.com/api/defis/"

  allUsers:Chami[]=[]
  allDefis:Defi[]=[]

  loginUser:string|undefined

  httpOptions = {
    headers: new HttpHeaders({
      'Content-type':  'application/json'
    })
  };

  constructor(private http : HttpClient,private put:PutService) {}


  async getResponseUsers(){
    this.allUsers=await lastValueFrom(this.http.get(this.apiUsers)) as Chami[]
  }

  getResponseUsers2():Observable<Object>{
    return this.http.get(this.apiUsers)
  }
  getResponseDefi2():Observable<Object>{
    return this.http.get(this.apiDefis)
  }



  async getResponseDefis(){
    this.allDefis=await lastValueFrom(this.http.get(this.apiDefis)) as Defi[]
  }



  checkExistingUser(name: string)
  {
      let iterationEl=0
      while(iterationEl<this.allUsers!.length){
        if(this.allUsers![iterationEl].login===name)
          return true
        iterationEl++
      }
      return false
  }


getCurrentUser(){
    try{
      const CurrentUser=this.allUsers.filter((element)=>element.login=this.loginUser!)
      return CurrentUser[0]
    }
    catch(exception){
        console.log("Error in getChamis ,couldnt set up users ",exception)
        alert("YOU HAVENT SIGN UP ")
        return null
    }
  }


  countForEachAuthor(auteur:string ,age:number,chamis:Chami[]){
    let defiCreated=0
    for(let i=0;i<chamis.length;i++){
      if(chamis[i].login===auteur)
        defiCreated++
    }
    return {auteur,age,defiCreated}
  }

  getDefis(){
    return this.allDefis;
  }
  getUsers(){
    return this.allUsers;
  }

  usersDefi(name:string){
      return this.allDefis!.filter(function(element){return element.auteur.login===name})
  }

  UpdatePointOfUser(point:number,increase:boolean){
    if(this.loginUser){
      const curretnUser=this.getCurrentUser()
      if(curretnUser!=null){
        if(increase)
          curretnUser.pointTotal=curretnUser.pointTotal+point
        else
          curretnUser.pointTotal=curretnUser.pointTotal-point
        this.put.updateUser(curretnUser.login,curretnUser).then(response=>{
          response?console.log("user have been updated with new points "):console.log("error occured while updating users points ")
        })
      }
    }
    else{
      alert("you are not loggin your points would be count bitch")
    }
  }
}
