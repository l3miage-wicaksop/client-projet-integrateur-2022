import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Visite } from '../iterfaces';

@Injectable({
  providedIn: 'root'
})
export class VisitesService {
  apiVisites:string="https://projet-integrateur-2022.herokuapp.com/api/visites/"
  allVisites:Visite[]=[]
  constructor(private http : HttpClient) { }

  async getResponseVisites(){
    return new Promise((resolve,err)=>{
      try{
        this.http.get(this.apiVisites).subscribe((data)=>{
          resolve(data)})
      }
    catch(exception){
      err(exception)
    }
    })
  }

  async setupVisites(){
    await this.getResponseVisites().then((val)=>{
      this.allVisites=val as Visite[]
      }).catch((val)=>console.log("Error in httpResponse ",val))
  }

  async getVisites(){
    if (this.allVisites.length==0)
      await this.setupVisites()
    console.log(this.allVisites)
    return this.allVisites
  }

//   usersVisites(name:string){
//     return this.allVisites.filter(function(element){return element.login===name})
// }

}
