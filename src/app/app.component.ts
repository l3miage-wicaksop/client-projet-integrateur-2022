import { PostService } from './services/post.service';
import { ModalService } from './services/modal.service';
import { VisitesService } from './services/visites.service';
import { AuthServiceService } from './services/auth-service.service';
import { Component, Injectable, OnInit, AfterViewInit } from '@angular/core';
import { circle, latLng, Layer, MapOptions, marker, tileLayer } from 'leaflet';
// Import the functions you need from the SDKs you need
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { Defi, InfoDefi, Visite, Position, Chami, TypeDefi, Etape, ChoixPossible } from './iterfaces';
import * as L from 'leaflet';
import { Timestamp } from 'firebase/firestore';

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
  allChamis:Chami[]|undefined


  visitesButton:boolean=false;
  choixPossibleTemp:ChoixPossible={choix:'fastfood'}
  ChoixPossibleTemp:ChoixPossible[]=[this.choixPossibleTemp]
  etapT:Etape={ description:"etapT",idEtape: '16', indication: { indicationText: "dirige toi vers le roi", srcImage: "httpqjfiqzjfquzon", srcVideo: "hthththth" }, question: { choixPossibles:this.ChoixPossibleTemp,questionText: "dans quel type de restaurant travail bob l'eponge", solution: "fastfood", point: 5, indice: {  point: 4, indiceText: "wow" } } }
  etapT2:Etape={ description :"etapT2",idEtape: '17', indication: {  indicationText: "", srcImage: "httpqjfiqzjfquzon", srcVideo: "hthththth" }, question: { choixPossibles:this.ChoixPossibleTemp, questionText: "qui est le meilleur ami de bob", solution: "patrick", point: 5, indice: {  point: 4, indiceText: "étoile rose"}}}
  etapesTemp:Etape[]=[this.etapT,this.etapT2]
  tempAllDefi={ idDefi: "D1", titre: "Defis noob", typeDefi: TypeDefi.enigme, description: "bob l'eponge", dateCreation: Timestamp.now(), points: 0, auteur: { login: "Nurbek Ss", age: 23, description: "checking", ville: "GRENOBLE", prenom: "Nurbek ", nom: "Serzhanov", pointTotal: 0, visites: [] }, arret: { codeArret: "23", nomArret: "Victor Hugo", ville: "Grenoble", openstreetmap: "https://www.openstreetmap.org/#map=19/45.189851/5.725127", googlemap: "https://www.google.com/maps/@45.189851,5.725127,19z", longitude: 5.725127, latitude: 45.189851, defis: ["D1"] }, visites: [], etapes:this.etapesTemp  }  as Defi
  allDefis:Defi[]|undefined//[this.tempAllDefi]
  constructor(public auth: AngularFireAuth,public authentif:AuthServiceService,public visites:VisitesService,
    private modal:ModalService,private post:PostService)  {


  }


  async ngOnInit(){
    this.getAll()
    this.post.Refreshrequired.subscribe(
      response=>{
        this.getAll()
      }
    )
    this.currentLocation()

  }

  initDefisOnMap(defis:Defi[]){
    try{
      defis.forEach(element=>{
        const temp= L.marker([element.arret.latitude, element.arret.longitude],{icon:this.defiIcon}).on("mouseover",event=>{
          event.target.bindPopup(element.idDefi).openPopup()
        }).on("mouseover",event=>event.target.closePopup())
        this.otherLayers.push(temp)
      })
    }
    catch{
      console.log("passing initDefiOnMap")
    }
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

  getAll(){
    this.getUsers()
    this.getDefis()
    this.getVisites()
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

  getUsers() {
    this.authentif.getResponseUsers2().subscribe(result=>{
      let data=result as Chami[]
      this.allChamis=data.sort((el,el2)=>{return el2.pointTotal-el.pointTotal});
      this.authentif.allUsers=this.allChamis
    })
  }
  getDefis() {
    this.authentif.getResponseDefi2().subscribe(result=>{
      const data=result as Defi[]
      this.allDefis=data
      this.authentif.allDefis=data
      this.visites.tempDefi=data[data.length-1]
      this.initDefisOnMap(data)
    })
  }
  getVisites(){
    this.visites.getResponseVisites2().subscribe(result=>{
      this.allVisites=result as Visite[]
      this.allVisites.sort((el,el2)=>{return el2.score - el.score;})
    })
  }
}
