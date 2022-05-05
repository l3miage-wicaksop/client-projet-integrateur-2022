import { ModalService } from './services/modal.service';
import { VisitesService } from './services/visites.service';
import { AuthServiceService } from './services/auth-service.service';
import { Component, Injectable, OnInit, AfterViewInit } from '@angular/core';
import { circle, latLng, Layer, MapOptions, marker, tileLayer } from 'leaflet';
// Import the functions you need from the SDKs you need
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { Defi, InfoDefi, Visite, Position } from './iterfaces';
import * as L from 'leaflet';
//import { rejects } from 'assert';

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

// Initialize Firebase

@Injectable({
  providedIn: 'root',
})
//https://projetintegrateur-2ed35.web.app/

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit{
  title: any = 'PROJETDEMERDE';

  [x: string]: any;

  options: MapOptions = {
    layers: [
      tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '...',
      }),
    ],
    zoom: 15,
    center: latLng(45.188529, 5.724524),
  };

  optionsGeo = {
    enableHighAccuracy: true,
    timeout: 10000,
    maximumAge: 0
  };

  defiIcon = L.icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/1388/1388262.png',
  iconSize: [32, 32]
  });

  currentPos = L.icon({
    iconUrl: 'https://cdn1.iconfinder.com/data/icons/travello-map-navigation/64/Nearby-512.png',
    iconSize: [32, 32]
  });

  //L.marker([45.188529, 5.724524],{icon:this.defiIcon})
  otherLayers: Layer[] = [];

  displayCircle = false;
  layerCircle: Layer = circle([45.188529, 5.724524], { radius: 500 });

  position:any=[]


  currentUser: null | firebase.User | undefined;
  auteur: string | undefined | null;
  userDefis: InfoDefi[]|undefined;

  allVisites:Visite[]|undefined
  visitesButton:boolean=false;
  constructor(public auth: AngularFireAuth,public authentif:AuthServiceService,public visites:VisitesService,
    private modal:ModalService)  {


  }


  async ngOnInit(){
    await Promise.all([this.authentif.getResponseDefis(),this.currentLocation(),this.authentif.getResponseUsers(),this.visites.getResponseVisites()])
    this.visites.tempDefi=this.authentif.getDefis()[this.authentif.getDefis().length-1]
    this.initDefisOnMap(this.authentif.getDefis())
    this.setVisites()
  }

  initDefisOnMap(defis:Defi[]){
    defis.forEach(element=>{
      const temp= L.marker([element.arret.latitude, element.arret.longitude],{icon:this.defiIcon}).on("mouseover",event=>{
        event.target.bindPopup(element.idDefi).openPopup()
      }).on("mouseover",event=>event.target.closePopup())
      this.otherLayers.push(temp)
    })
  }

  async currentLocation(){
    if (navigator.geolocation)
      navigator.geolocation.getCurrentPosition(this.setMarkerOnCurrLocation.bind(this),this.errorFunction,this.optionsGeo);
    else
    console.log("Your browser doesnt support geolocation feature\n")
  }

  async setMarkerOnCurrLocation(pos:any){
    const me= L.marker([pos.coords.latitude,pos.coords.longitude],{icon:this.currentPos})
    this.otherLayers.push(me)
  }

  errorFunction(err:any){
    console.warn("you have got error: ",err);
  }

  setVisites(){
    this.allVisites=this.visites.getVisites()
    }



  openModal(id: string) {
    this.modal.open(id);
  }

  closeModal(id: string) {
    this.modal.close(id);
  }
  setPosition(position:Position){
    this.otherLayers[0]=L.marker([position.lat ,position.long],{icon:this.currentPos})
  }

}
