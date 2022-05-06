import { PostService } from './post.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Defi, Visite } from '../iterfaces';

@Injectable({
  providedIn: 'root',
})
export class VisitesService {
  apiVisites: string =
    'https://projet-integrateur-2022.herokuapp.com/api/visites/';
  allVisites: Visite[] = [];
  currentVisite: Visite | undefined;
  userLong = 0;
  userLat = 0;
  accesVisite = false;
  tempDefi: Defi | undefined;
  isUserNear = false;

  constructor(private http: HttpClient, private postServ: PostService) {
    this.sec();
  }

  async getResponseVisites() {
    return new Promise((resolve, err) => {
      try {
        this.http.get(this.apiVisites).subscribe((data) => {
          resolve(data);
        });
      } catch (exception) {
        err(exception);
      }
    });
  }

  optionsGeo = {
    enableHighAccuracy: true,
    timeout: 10000,
    maximumAge: 0,
  };

  async setupVisites() {
    await this.getResponseVisites()
      .then((val) => {
        this.allVisites = val as Visite[];
      })
      .catch((val) => console.log('Error in httpResponse ', val));
  }

  async getVisites() {
    if (this.allVisites.length == 0) await this.setupVisites();
    console.log(this.allVisites);
    return this.allVisites;
  }
  async sec() {
    await this.currentLocation();
  }

  setToZero() {
    this.userLat = 0;
    this.userLong = 0;
  }

  isUserOnPlace(defi: Defi) {
    let place = defi.arret;
    let distance = this.getDistanceFromLatLonInKm(
      place.latitude,
      place.longitude,
      this.userLat,
      this.userLong
    );
    this.setToZero();
    if (distance > 0.1)
      //10 meters
      return false;
    console.log(distance);
    this.accesVisite = true;
    this.tempDefi = defi;
    return true;
  }

  getDistanceFromLatLonInKm(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ) {
    var R = 6371; // Radius of the earth in km
    var dLat = this.deg2rad(lat2 - lat1); // deg2rad below
    var dLon = this.deg2rad(lon2 - lon1);
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) *
        Math.cos(this.deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    return d;
  }

  deg2rad(deg: number) {
    return deg * (Math.PI / 180);
  }

  async currentLocation() {
    if (navigator.geolocation)
      navigator.geolocation.getCurrentPosition(
        this.setLatLongUsers.bind(this),
        this.errorFunction,
        this.optionsGeo
      );
    else console.log('Your browser doesnt support geolocation feature\n');
  }

  setLatLongUsers(pos: any) {
    //pos.coords.latitude,pos.coords.longitude
    console.log('our position', pos);

    this.userLong = pos.coords.longitude + 2000;
    this.userLat = pos.coords.latitude;
    console.log('asdad ' + this.userLong + ' ' + this.userLat);
  }

  errorFunction(err: any) {
    console.warn('you have got error: ', err);
  }

  //   usersVisites(name:string){
  //     return this.allVisites.filter(function(element){return element.login===name})
  // }

  notification(text: string) {
    alert(text);
  }
}
