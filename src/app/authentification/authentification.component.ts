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
  dataIconGoogle = 'assets/images/iconGoogle.png';

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

  login(): void {
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.setCustomParameters({
      prompt: 'select_account'
    });
    this.auth.signInWithPopup(provider);
  }
  logout(): void {
    this.auth.signOut();
  }

}
