import { AuthServiceService } from './../auth-service.service';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-authentification',
  templateUrl: './authentification.component.html',
  styleUrls: ['./authentification.component.scss']
})
export class AuthentificationComponent implements OnInit {

  currentUser: firebase.User | undefined|null
  photoUrl:string|undefined|null;
  nameUser:string|undefined|null|any;
  nameState:string="Loggin"
  city:string|undefined
  age:number|undefined

  constructor(public afs: AngularFirestore,public auth:AngularFireAuth,public authServ:AuthServiceService) { }

  ngOnInit(): void {
  }


  login()
  {
    this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(
       ()=>{
        this.currentUser=firebase.auth().currentUser;
        this.currentUser?.providerData.forEach( async profile=>{
          this.photoUrl=profile?.photoURL
          this.nameUser=profile?.displayName

          this.nameState=this.nameUser + " .Woud you like to logout?"
        })
      }
    // ).then(
    //   ()=>{
    //     if(typeof(this.nameUser)==="string" && this.authServ.checkExistingUser(this.nameUser)){
    //       //download mes defis and mes visite
    //       console.log("ok")
    //       this.logout()
    //     }
    //     else{
    //       console.log("Else pass here ,if you have an error so then nameUser is not a string")
    //       // new user what should he do?
    //       //frame
    //     }
    ).catch((error)=>{
      console.log("Got error ,No user has been found :",error);})
  }

  registrationFrame(){

  }

  logout() {
    this.auth.signOut();
    this.nameUser=undefined
    this.photoUrl=undefined
    this.nameState="Loggin"
  }
  initFrameRegistre(){

  }
}
