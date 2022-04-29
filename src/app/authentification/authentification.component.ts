import { ModalService } from './../services/modal.service';
import { AuthServiceService } from './../auth-service.service';
import { Component, OnInit ,OnChanges, AfterViewInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { ChangeDetectorRef} from '@angular/core';




@Component({
  selector: 'app-authentification',
  templateUrl: './authentification.component.html',
  styleUrls: ['./authentification.component.scss']
})
export class AuthentificationComponent implements OnInit ,AfterViewInit{

  userNotUndefined=false
  userLogIn=false

  currentUser: firebase.User | undefined|null
  photoUrl:string|undefined|null;
  nameUser:string|undefined|null|any;
  nameState:string="Loggin"
  city:string|undefined
  age:number|undefined

  constructor(public auth:AngularFireAuth,public modal:ModalService,public authServ:AuthServiceService,private cdref: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.logout()

  }


  async login()
  {
      return await this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(
       ()=>{
        this.currentUser=firebase.auth().currentUser;
        this.currentUser?.providerData.forEach( async profile=> {
          this.photoUrl=profile?.photoURL
          console.log(this.photoUrl)
          this.nameUser=profile?.displayName
          this.nameState=this.nameUser + " .Woud you like to logout?"
          this.userLogIn=true
          this.ngAfterViewInit()
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



  logout() {
    this.auth.signOut();
    this.nameUser=undefined
    this.photoUrl=undefined
    this.userLogIn=false
    this.userNotUndefined=false
    this.nameState="Loggin"
  }

  initFrameRegistre(){
    this.modal.open("registreForm");
  }
  closeFrameRegistre(){
    this.modal.close("registreForm");
  }

  controllerAuth(){
      if(typeof(this.nameUser)==="string" && this.authServ.checkExistingUser(this.nameUser)){
        this.userNotUndefined=true
        //this.initFrameRegistre()

      }

  }
  ngAfterViewInit(){
    Promise.resolve().then(()=>{
      if(this.userLogIn){
        this.controllerAuth()
      }
    })
  }



}
