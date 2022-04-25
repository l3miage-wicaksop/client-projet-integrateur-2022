import { Component, Injectable } from '@angular/core';
import { circle, latLng, Layer, MapOptions, marker, tileLayer } from 'leaflet';
// Import the functions you need from the SDKs you need
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { rejects } from 'assert';

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

// Initialize Firebase

@Injectable({
  providedIn: 'root',
})
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title: any = 'PROJETDEMERDE';
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
  otherLayers: Layer[] = [marker([45.188529, 5.724524])];

  displayCircle = false;
  layerCircle: Layer = circle([45.188529, 5.724524], { radius: 500 });

  currentUser: null | firebase.User | undefined;
  auteur: string | undefined | null;

  constructor(public auth: AngularFireAuth) {}

  verificationUser() {
    /*this.serviceX.readAllUsers().subscribe(
      {next: (obj) => {
        if(this.auther in ALLNAMESCHAMISAUTEURS)
        return PROMISE.resolve
        else
        return Promise.reject

      },
        error: (e) => console.error(e),
        complete: () => console.info('complete')
      }})*/
    return new Promise<number>((resolve, reject) => {
      resolve(1);
    });
  }

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
  }

  logout() {
    this.auth.signOut();
  }
}
