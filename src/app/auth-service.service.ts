import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import { Chamis,Chami,Defi } from './iterfaces';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  apiUsers:string ="https://projet-integrateur-2022.herokuapp.com/api/chamis/"
  apiDefis:string ="https://projet-integrateur-2022.herokuapp.com/api/defis/"
  allUsers:Chamis={all:[]}//Change!!!!
  allDefis:Defi[] | undefined

  httpOptions = {
    headers: new HttpHeaders({
      'Content-type':  'application/json'
    })
  };

  constructor(private http : HttpClient) {

  }

  async getResponseUsers(){
    return new Promise((resolve,err)=>{
      try{
        this.http.get(this.apiUsers).subscribe((data)=>{
          resolve(data)})
      }
    catch(exception){
      err(exception)
    }
    })
  }

  async getResponseDefis(){
    return new Promise((resolve,err)=>{
      try{
        this.http.get(this.apiDefis).subscribe((data)=>{
          resolve(data)})
      }
    catch(exception){
      err(exception)
    }
    })
  }

  async setupUsers(){
    await this.getResponseUsers().then((val)=>{
      this.allUsers={all:val as Chami[]}
      }).catch((val)=>console.log("Error in httpResponse ",val)
      )
  }

  async setupDefis(){
    await this.getResponseDefis().then((val)=>{
      this.allDefis=val as Defi[]
      }).catch((val)=>console.log("Error in httpResponse ",val)
      )
  }

  async checkExistingUser(name: string)
  {
    await this.setupUsers()
    const iterationEl=0
    while(iterationEl<this.allUsers.all.length){
      if(this.allUsers.all[iterationEl].login===name)
        return true
    }
    return false
  }

  async getChamis(){
    try{
      if(this.allUsers.all.length==0)
        await this.setupUsers()
      const ChamiVue=this.allUsers.all.map((element)=>{return this.countForEachAuthor(element.login,element.age,this.allUsers.all)})
      return ChamiVue
    }
    catch(exception){
       throw Error("Error in getChamis ,couldnt set up users ")
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

  async getDefis(){
    if(this.allDefis?.length==0)
       await this.setupDefis()
    return this.allDefis;
  }

}