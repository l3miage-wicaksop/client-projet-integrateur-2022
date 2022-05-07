import { AuthentificationComponent } from './../authentification/authentification.component';
import { VisitesService } from './../services/visites.service';
import { Defi, Etape, Visite } from './../iterfaces';
import { Component, Input, OnInit } from '@angular/core';
import { ModalService } from '../services/modal.service';
import { AuthServiceService } from '../services/auth-service.service';

@Component({
  selector: 'app-etape',
  templateUrl: './etape.component.html',
  styleUrls: ['./etape.component.scss']
})
export class EtapeComponent implements OnInit {
  @Input() defiOfEtape:Defi|undefined
  @Input() etape:Etape|undefined

  usingIndice=false
  visiteServInEtape: any;
  constructor(private modal: ModalService,private auth:AuthServiceService) { }

  ngOnInit(): void {
  }

  useIndice(){
    this.usingIndice=true
    //do - points in visites
    this.auth.UpdatePointOfUser(this.etape!.indice.point,false)
  }

  getCurrentIdEtape(){
    return this.defiOfEtape?.idDefi+'-'+this.defiOfEtape?.etapes.indexOf(this.etape!)
  }

  getNextId(){
    if(this.defiOfEtape?.etapes.indexOf(this.etape!)===this.defiOfEtape!.etapes.length-1){
      console.log("the last etape")
      //output the last etape
      return "last"
    }
    return this.defiOfEtape?.idDefi+'-'+this.defiOfEtape?.etapes.indexOf(this.etape!)+1
  }

  getPreviousId(){
    if(this.defiOfEtape?.etapes.indexOf(this.etape!)===0){
      console.log("the first etape")
      //output the last etape
      return "first"
    }
    const last=this.defiOfEtape!.etapes.indexOf(this.etape!)-1
    return  this.defiOfEtape?.idDefi+'-'+last
  }

  //id of every etape modal its his iddefi-index of etape
  next(){
    this.modal.next(this.getCurrentIdEtape(),this.getNextId())
  }

  previous(){
    this.modal.previous(this.getCurrentIdEtape(),this.getPreviousId())
  }

  correctAnswer(pointPlus:number){
    this.auth.UpdatePointOfUser(pointPlus,true)
  }
  incorrectAnswer(pointMinus:number){
    this.auth.UpdatePointOfUser(pointMinus,false)
  }
}
