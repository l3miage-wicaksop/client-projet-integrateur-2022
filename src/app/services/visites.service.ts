
import { PostService } from './post.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Defi, Visite } from '../iterfaces';
import { lastValueFrom, Observable } from 'rxjs';
import { Timestamp } from 'firebase/firestore';


@Injectable({
  providedIn: 'root'
})
export class VisitesService {

  apiVisites:string="https://projet-integrateur-2022.herokuapp.com/api/visites/"
  allVisites:Visite[]=[]
  currentVisite:Visite|undefined
  userLong=0
  userLat=0
  accesVisite=false
  tempDefi:Defi|undefined
  isUserNear=false

  constructor(private http : HttpClient,private postServ:PostService) { this.currentLocation()}


  async getResponseVisites(){
    this.allVisites=await lastValueFrom(this.http.get(this.apiVisites)) as Visite[]

  }

  optionsGeo = {
    enableHighAccuracy: true,
    timeout: 10000,
    maximumAge: 0
  };

  getResponseVisites2():Observable<Object>{
    return this.http.get(this.apiVisites)
  }


  getVisites(){
    return this.allVisites
  }


  setToZero(){
    this.userLat=0
    this.userLong=0
  }

  //Cheking the distance between defi and user
  isUserOnPlace(defi:Defi){
    let place=defi.arret
    let distance=this.getDistanceFromLatLonInKm(place.latitude,place.longitude,this.userLat,this.userLong)
    this.setToZero()
     if(distance>0.1) //10 meters
       return false
     console.log(distance)
    this.accesVisite=true
    this.tempDefi=defi
    return true
  }

  getDistanceFromLatLonInKm(lat1:number, lon1:number, lat2:number, lon2:number) {

    var R = 6371; // Radius of the earth in km
    var dLat = this.deg2rad(lat2-lat1);  // deg2rad below
    var dLon = this.deg2rad(lon2-lon1);
    var a =
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ;
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c; // Distance in km
    return d;
  }

  deg2rad(deg:number) {
    return deg * (Math.PI/180)
  }



  currentLocation(){
    if (navigator.geolocation)
       navigator.geolocation.getCurrentPosition(this.setLatLongUsers.bind(this), this.errorFunction, this.optionsGeo);
    else
    console.log("Your browser doesnt support geolocation feature\n")
  }
  setLatLongUsers(pos:any){
    //pos.coords.latitude,pos.coords.longitude
    console.log("our position",pos)
    this.userLong=pos.coords.longitude
    this.userLat=pos.coords.latitude
  }

  errorFunction(err:any){
    console.warn("you have got error: ",err);
  }


  userVisites(name:string){
    try{
      return this.allVisites.filter(function(element){return element.chami.login===name})
    }
    catch{
      return []//in  the case when we have no visites
    }
  }

  notification(text:string){
    alert(text);
  }

  visiteOfDefi(defi:Defi){
    if(defi===undefined)
      return []//in the case when defi have no visites
    return this.allVisites.filter(function(element){return element.defi===defi})
   }

   updateVisite(timeInSec:string){
     if(this.currentVisite){
      this.currentVisite.temps=timeInSec
      this.postServ.postingVisitePromise(this.currentVisite)
     }
   }

   updatingTimePoints(points:number){
    const timeBack=this.currentVisite!.dateDebut
    const timeNow=Timestamp.now()
    const ecartTime=timeNow.seconds-timeBack!.seconds
      //points
    this.currentVisite!.pointsTotal=points
    this.currentVisite!.score<=points?this.currentVisite!.score=points:
    this.updateVisite(ecartTime.toString())
  }

  isAnonyVisite(visite:any){
    try{
      return visite.visiteur.login
    }
    catch{
      return "Anonyme"
    }
  }
}
