import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import { Chami, Defi } from '../iterfaces';


@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  apiUsers:string ="https://projet-integrateur-2022.herokuapp.com/api/chamis/"
  apiDefis:string ="https://projet-integrateur-2022.herokuapp.com/api/defis/"
  //allUsers:Chamis={all:[]}//Change!!!!
  allUsers:Chami[]=[]
  allDefis:Defi[]=[]

  httpOptions = {
    headers: new HttpHeaders({
      'Content-type':  'application/json'
    })
  };

  constructor(private http : HttpClient) {}

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
      this.allUsers=val as Chami[]
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
      let iterationEl=0
      while(iterationEl<this.allUsers.length){
        if(this.allUsers[iterationEl].login===name)
          return true
        iterationEl++
      }
      return false
  }


  async getChamis(){
    try{
      // if(this.allUsers.length==0)
      //   await this.setupUsers()
      const ChamiVue=this.allUsers.map((element)=>{return this.countForEachAuthor(element.login,element.age,this.allUsers)})
      return ChamiVue
    }
    catch(exception){
        console.log("Error in getChamis ,couldnt set up users ")
        return []
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
    // if(this.allDefis?.length==0)
    //    await this.setupDefis()
    return this.allDefis;
  }

  usersDefi(name:string){
      return this.allDefis.filter(function(element){return element.auteur.login===name})
  }

}
