import { VisitesService } from './../services/visites.service';
import { ModalService } from './../services/modal.service';
import { AuthServiceService } from '../services/auth-service.service';
import { Component, OnInit , AfterViewInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { ChangeDetectorRef} from '@angular/core';
import { Defi, Visite } from '../iterfaces';




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

  mesVisites:Visite[]=[]
  mesDefis:Defi[]=[]

  constructor(public auth:AngularFireAuth,public modalService:ModalService,
    public authServ:AuthServiceService,private visiteServ:VisitesService) { }

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
          this.authServ.loginUser=this.nameUser
          this.nameState=this.nameUser + " .Woud you like to logout?"
          this.userLogIn=true
          this.mesDefis=this.authServ.usersDefi(this.nameUser)
          this.mesVisites=this.visiteServ.userVisites(this.nameUser)
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
        if(typeof(this.nameUser)==="string" && !this.authServ.checkExistingUser(this.nameUser)){
          console.log("user doesnt Exist")
          this.userNotUndefined=true}
        else
          console.log("user exists or name of user is not string")
    })
  }

  openModal(id: string) {
    this.modalService.open(id);
}

  closeModal(id: string) {
      this.modalService.close(id);
  }
}
