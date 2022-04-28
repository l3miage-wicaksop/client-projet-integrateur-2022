import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';

@Component({
  selector: 'app-authentification',
  templateUrl: './authentification.component.html',
  styleUrls: ['./authentification.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthentificationComponent implements OnInit {

  currentUser: firebase.User | undefined|null
  photoUrl:string|undefined|null;
  nameUser:string|undefined|null|any;
  nameState:string="Loggin"
  city:string|undefined
  age:number|undefined

  constructor(public auth: AngularFireAuth) {
  }

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
    ).catch((error)=>{
      console.log("Got error ,No user has been found :",error);})
  }

  registrationFrame(){

  }

  logout() {
    this.auth.signOut();
  }
  initFrameRegistre(){

  }
}
