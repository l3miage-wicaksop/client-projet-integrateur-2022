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
