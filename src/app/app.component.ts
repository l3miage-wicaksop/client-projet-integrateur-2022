import { Component, Injectable, OnInit, AfterViewInit, AfterContentInit } from '@angular/core';
import { circle, latLng, Layer, MapOptions, marker, tileLayer } from 'leaflet';
// Import the functions you need from the SDKs you need
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import {  InfoDefi } from './iterfaces';
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
export class AppComponent implements AfterViewInit{
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

  otherLayers: Layer[] = [L.marker([45.188529, 5.724524],{icon:this.defiIcon})];

  displayCircle = false;
  layerCircle: Layer = circle([45.188529, 5.724524], { radius: 500 });

  position:any=[]
  longitudeUser=0
  latitudeUser=0

  currentUser: null | firebase.User | undefined;
  auteur: string | undefined | null;
  userDefis: InfoDefi[]|undefined;

  constructor(public auth: AngularFireAuth)  {


  }

  ngAfterViewInit(){
    this.currentLocation()
    console.log("wassup")
  }

  initDefisOnMap(defis:InfoDefi[]){
    defis.forEach(element=>{
      const temp= L.marker([element.lat, element.long],{icon:this.defiIcon}).on("mouseover",event=>{
        event.target.bindPopup(element.titre).openPopup()
      }).on("mouseover",event=>event.target.closePopup())
      this.otherLayers.push(temp)
    })
  }

  currentLocation(){
    if (navigator.geolocation)
      navigator.geolocation.getCurrentPosition(this.setMarkerOnCurrLocation.bind(this),this.errorFunction,this.optionsGeo);
    else
    console.log("Your browser doesnt support geolocation feature\n")
  }

  setMarkerOnCurrLocation(pos:any){
    console.log(pos)
    console.log(pos.coords.accuracy)
    console.log(pos.coords.altitudeAccuracy)
    const me= L.marker([pos.coords.latitude,pos.coords.longitude],{icon:this.currentPos})
    this.otherLayers.push(me)

  }

  errorFunction(err:any){
    console.warn("you have got error: ",err);
  }
}
