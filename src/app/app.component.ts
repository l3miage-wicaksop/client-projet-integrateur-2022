import { Component } from '@angular/core';
import { circle, latLng, Layer, MapOptions, marker, tileLayer } from 'leaflet';
// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

const firebaseConfig = {

  apiKey: "AIzaSyDWsoddNHtY-Rwirp-jyHB9-0tzhvT6coE",

  authDomain: "projetintegrateur-2ed35.firebaseapp.com",

  projectId: "projetintegrateur-2ed35",

  storageBucket: "projetintegrateur-2ed35.appspot.com",

  messagingSenderId: "62423672571",

  appId: "1:62423672571:web:86c95b9c2f6f317145b25e"

};


// Initialize Firebase

const app = initializeApp(firebaseConfig);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  options: MapOptions = {
    layers: [
      tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18,  attribution: '...' }),
    ],
    zoom: 15,
    center: latLng(	45.188529, 	5.724524)
  };
  otherLayers: Layer[] = [
    marker([ 45.188529, 	5.724524 ])
  ];

  displayCircle = false;
  layerCircle: Layer = circle([ 45.188529, 	5.724524 ], {radius: 500} )
}
