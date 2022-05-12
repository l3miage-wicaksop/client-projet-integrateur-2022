import { PutService } from './put.service';
import { Injectable, Input } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import { Chami, Defi } from '../iterfaces';
import { elementAt, lastValueFrom, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  apiUsers:string ="https://projet-integrateur-2022.herokuapp.com/api/chamis/"
  apiDefis:string ="https://projet-integrateur-2022.herokuapp.com/api/defis/"

  allUsers:Chami[]=[]
  allDefis:Defi[]=[]

  lastName:String|undefined
  allNames:any[]=[]

  loginUser:string|undefined
  pointsOfCurrentUser=0
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
      for(let i=0;i<this.allUsers.length;i++){
        if(this.allUsers[i].login===this.loginUser){
          return this.allUsers[i]
        }

      }
      return null //error
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
    try{//for case when the user doesnt have been loggin

      return this.allDefis!.filter(function(element){
        const elementTemp=element.auteur as any
        if(typeof(element.auteur)=='string'){
          return element.auteur===name
        }
        else{
          return elementTemp.login===name
        }

      })
    }
    catch(Ex){
      return []
    }
  }

  UpdatePointOfUser(point:number,increase:boolean){
    if(this.loginUser){
      const curretnUser=this.getCurrentUser()//Chami
      console.log("current user is ",curretnUser)
      if(curretnUser!=null){
        if(increase){
          curretnUser.pointTotal=curretnUser.pointTotal+point
          this.pointsOfCurrentUser=this.pointsOfCurrentUser+point}
        else{
          curretnUser.pointTotal=curretnUser.pointTotal-point
          this.pointsOfCurrentUser=this.pointsOfCurrentUser-point}
        this.put.updateUser(curretnUser.login,curretnUser).then(response=>{
          response?console.log("user have been updated with new points "):console.log("error occured while updating users points ")
        })
      }
    }
    else{
      alert("you are not loggin your points would be count bitch")
    }
  }

  instanceOfChami(objet:any):objet is Chami{

    try{
      return 'login' in objet;
    }
    catch{
      return false
    }
  }
  setAllNames(){
    for(let i=0;i<this.allDefis.length;i++){
      if(this.instanceOfChami(this.allDefis[i].auteur)){
        this.allNames.push(this.allDefis[i].auteur.login)
      }else{
        this.allNames.push(this.allDefis[i].auteur)}
    }
  }
  getAllNames(){
    return this.allNames
  }
}
