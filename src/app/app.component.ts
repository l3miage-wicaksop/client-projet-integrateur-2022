import { ModalService } from './services/modal.service';
import { VisitesService } from './services/visites.service';
import { AuthServiceService } from './services/auth-service.service';
import { Component, Injectable, OnInit, AfterViewInit } from '@angular/core';
import { circle, latLng, Layer, MapOptions, marker, tileLayer } from 'leaflet';
// Import the functions you need from the SDKs you need
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
<<<<<<< HEAD
<<<<<<< Updated upstream
=======
import { Defi, InfoDefi, Visite } from './iterfaces';
//import { OpenLayers } from 'node_modules/@types/openlayers';

import * as L from 'leaflet';
>>>>>>> Stashed changes
=======
import { Defi, InfoDefi, Visite, Position } from './iterfaces';
import * as L from 'leaflet';
>>>>>>> origin/Nurbek
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
<<<<<<< HEAD
<<<<<<< Updated upstream
export class AppComponent {
=======
export class AppComponent implements AfterViewInit {
>>>>>>> Stashed changes
=======
export class AppComponent implements OnInit{
>>>>>>> origin/Nurbek
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
<<<<<<< HEAD
<<<<<<< Updated upstream
  otherLayers: Layer[] = [marker([45.188529, 5.724524])];
=======
=======
>>>>>>> origin/Nurbek

  optionsGeo = {
    enableHighAccuracy: true,
    timeout: 10000,
<<<<<<< HEAD
    maximumAge: 0,
  };

  defiIcon = L.icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/1388/1388262.png',
    iconSize: [32, 32],
  });

  currentPos = L.icon({
    iconUrl:
      'https://cdn1.iconfinder.com/data/icons/travello-map-navigation/64/Nearby-512.png',
    iconSize: [32, 32],
=======
    maximumAge: 0
  };

  defiIcon = L.icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/1388/1388262.png',
  iconSize: [32, 32]
  });

  currentPos = L.icon({
    iconUrl: 'https://cdn1.iconfinder.com/data/icons/travello-map-navigation/64/Nearby-512.png',
    iconSize: [32, 32]
>>>>>>> origin/Nurbek
  });

  //L.marker([45.188529, 5.724524],{icon:this.defiIcon})
  otherLayers: Layer[] = [];
<<<<<<< HEAD
>>>>>>> Stashed changes
=======
>>>>>>> origin/Nurbek

  displayCircle = false;
  layerCircle: Layer = circle([45.188529, 5.724524], { radius: 500 });

<<<<<<< HEAD
<<<<<<< Updated upstream
=======
  position:any=[]


>>>>>>> origin/Nurbek
  currentUser: null | firebase.User | undefined;
  auteur: string | undefined | null;
  userDefis: InfoDefi[]|undefined;

  allVisites:Visite[]|undefined
  visitesButton:boolean=false;
  constructor(public auth: AngularFireAuth,public authentif:AuthServiceService,public visites:VisitesService,
    private modal:ModalService)  {


  }

<<<<<<< HEAD
  login() {
    this.auth
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then(async () => {
        this.currentUser = firebase.auth().currentUser;
        this.currentUser?.providerData.forEach(async (profile) => {
          this.auteur = profile?.displayName;
          console.log('setted');
          await this.verificationUser().then(
            (val) => console.log(val)
            //case1 when we know auteur
            //case2 when we dont know auteur we go to REGISTRATION FORM
          );
        });
      })
      .catch((error) => {
        console.log('Got error ,No user has been found :', error);
      });
=======
  position: any = [];

  currentUser: null | firebase.User | undefined;
  auteur: string | undefined | null;
  userDefis: InfoDefi[] | undefined;

  AllVisites: Visite[] | undefined;
  visitesButton: boolean = false;
  constructor(
    public auth: AngularFireAuth,
    private authentif: AuthServiceService,
    public visites: VisitesService,
    private modal: ModalService
  ) {}

  async ngAfterViewInit() {
    this.currentLocation();
    if (this.authentif.allDefis?.length == 0) await this.authentif.setupDefis();
    this.initDefisOnMap(this.authentif.allDefis);
    this.setVisites();
  }

  drawDistance(Long: number, Lat: number) {
    /* map = new OpenLayers.Map();
    this.otherLayers[0].
    var start_point = new this.otherLayers.Geometry.Point(0, 10);
    var end_point = new OpenLayers.Geometry.Point(30, 0);

    var vector = new OpenLayers.Layer.Vector();
    vector.addFeatures([
      new OpenLayers.Feature.Vector(
        new OpenLayers.Geometry.LineString([start_point, end_point])
      ),
    ]);
    map.addLayers([vector]);*/
  }

  initDefisOnMap(defis: Defi[]) {
    defis.forEach((element) => {
      const temp = L.marker([element.arret.latitude, element.arret.longitude], {
        icon: this.defiIcon,
      })
        .on('mouseover', (event) => {
          event.target.bindPopup(element.idDefi).openPopup();
        })
        .on('mouseover', (event) => event.target.closePopup());
      this.otherLayers.push(temp);
    });
  }

  currentLocation() {
    if (navigator.geolocation)
      navigator.geolocation.getCurrentPosition(
        this.setMarkerOnCurrLocation.bind(this),
        this.errorFunction,
        this.optionsGeo
      );
    else console.log('Your browser doesnt support geolocation feature\n');
  }

  setMarkerOnCurrLocation(pos: any) {
    const me = L.marker([pos.coords.latitude, pos.coords.longitude], {
      icon: this.currentPos,
    });
    this.otherLayers.push(me);
  }

  errorFunction(err: any) {
    console.warn('you have got error: ', err);
  }

  setVisites() {
    this.visites.getVisites().then((val) => {
      this.AllVisites = val as Visite[];
    });
  }

  openModal(id: string) {
    this.modal.open(id);
>>>>>>> Stashed changes
=======

  async ngOnInit(){
    await Promise.all([this.authentif.getResponseDefis(),this.currentLocation(),this.authentif.getResponseUsers(),this.visites.getResponseVisites()])
    this.visites.tempDefi=this.authentif.getDefis()[this.authentif.getDefis().length-1]
    this.initDefisOnMap(this.authentif.getDefis())
    this.setVisites()
>>>>>>> origin/Nurbek
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
