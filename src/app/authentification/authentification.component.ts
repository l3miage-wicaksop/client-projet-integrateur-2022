import { ModalService } from './../services/modal.service';
import { AuthServiceService } from '../services/auth-service.service';
import { Component, OnInit , AfterViewInit } from '@angular/core';
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
  nameState:string="Login"
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

  controllerAuth(){
      if(typeof(this.nameUser)==="string" && this.authServ.checkExistingUser(this.nameUser)){
        this.userNotUndefined=true
      }
  }

  ngAfterViewInit(){
    Promise.resolve().then(()=>{
      if(this.userLogIn){
        if(typeof(this.nameUser)==="string" && !this.authServ.checkExistingUser(this.nameUser)){
          console.log("user doesnt Exist")
          this.userNotUndefined=true
        }
        else{
          console.log("user exists or name of user is not string")
        }
      }
    })
  }

}
