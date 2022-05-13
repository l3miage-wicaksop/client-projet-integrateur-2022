import { DefiService } from './../services/defi.service';
import { VisitesService } from './../services/visites.service';
import { Defi, Etape, Visite } from './../iterfaces';
import { Component, Input, AfterViewInit, OnInit } from '@angular/core';
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
  visiteServInEtape: Visite|undefined;
  registrationYourVisite:boolean=false

  firstEtape=false
  lastEtape=false
  firstEtapeRef:String|undefined
  lastEtapeRef:String|undefined
  currentEtapeId:string|undefined

  correctAns:boolean|undefined=false
  incorrectAns:boolean|undefined

  pointPlus=0
  pointMinus=0

  constructor(public modal: ModalService,private auth:AuthServiceService,private visiteServ:VisitesService,public defiServ:DefiService) {
    this.visiteServ.currentVisite?this.visiteServInEtape=this.visiteServ.currentVisite:console.log()
  }

  ngOnInit(): void {
    //this.currentEtapeId=this.getCurrentIdEtape()
    this.firstEtapeRef=this.getPreviousId()
    this.lastEtapeRef=this.getNextId()
    if(this.firstEtape)
      this.currentEtapeId=this.firstEtapeRef as string
    else if(this.lastEtape){
      this.currentEtapeId=this.lastEtapeRef as string
    }
    else
      this.currentEtapeId=this.getCurrentIdEtape()
  }

  getCurrentIdEtape(){
    return this.defiOfEtape?.idDefi+'-'+this.defiOfEtape?.etapes.indexOf(this.etape!)
  }

  getNextId(){
    if(this.defiOfEtape?.etapes.indexOf(this.etape!)===this.defiOfEtape!.etapes.length-1){
      // -1 for create the nextEtape in jw-modal ;-2 for make possible to open the last model
      //Ex: [E1,E2] E1=idE1-first in modal E2=idE2-last in modal
      //but E1.getNextId with -1 will get idE2-Defi.Id because indexof(E1)=0 !=[E1,E2].length-1
      this.lastEtape=true
      console.log("the last etape")
      //output the last etape
      return this.defiOfEtape?.idDefi+"-"+"last"
    }
    return this.defiOfEtape?.idDefi+'-'+this.defiOfEtape?.etapes.indexOf(this.etape!)+1
  }


  getPreviousId(){
    if(this.defiOfEtape?.etapes.indexOf(this.etape!)===0){
      console.log("the first etape")
      //output the first etape
      this.firstEtape=true
      console.log("opening ->",this.defiOfEtape?.idDefi+"-"+"first")
      return this.defiOfEtape?.idDefi+"-"+"first"

    }
    const last=this.defiOfEtape!.etapes.indexOf(this.etape!)-1
    return  this.defiOfEtape?.idDefi+'-'+last
  }

  //id of every etape modal its his iddefi-index of etape
  next(){
     // -1 for create the nextEtape in jw-modal ;-2 for make possible to open the last model
      //Ex: [E1,E2] E1=idE1-first in modal E2=idE2-last in modal
      //but E1.getNextId with -1 will get idE2-Defi.Id because indexof(E1)=0 !=[E1,E2].length-1
    if(this.defiOfEtape?.etapes.indexOf(this.etape!)===this.defiOfEtape!.etapes.length-2){
      this.modal.next(this.currentEtapeId!,this.defiOfEtape!.idDefi+"-"+"last")
    }
    else
      this.modal.next(this.currentEtapeId!,this.defiOfEtape?.idDefi+'-'+this.defiOfEtape?.etapes.indexOf(this.etape!)+1)
  }

  previous(){
    //Ref in next()
    if(this.defiOfEtape!.etapes.indexOf(this.etape!)-1==0){
      this.modal.previous(this.currentEtapeId!,this.defiOfEtape!.idDefi+"-"+"first")
    }else{this.modal.previous(this.currentEtapeId!,this.getPreviousId())}

  }

  correctAnswer(pointPlus:number){
    this.pointPlus=pointPlus
    this.auth.UpdatePointOfUser(pointPlus,true)
    this.correctAns=true
    this.incorrectAns=false
  }
  incorrectAnswer(pointMinus:number){
    this.pointMinus=pointMinus
    this.auth.UpdatePointOfUser(pointMinus,false)
    this.incorrectAns=true
    this.correctAns=false
  }

  close(){
    if(this.visiteServInEtape){
      this.registrationYourVisite=true
      this.modal.open('TempForVisiteRegistre')
      this.registrationYourVisite=false
    }
    else{
      if(this.defiOfEtape!.etapes.indexOf(this.etape!)-2==0){
        this.modal.close(this.defiOfEtape!.idDefi+"-"+"first")}
      else{
        this.modal.close(this.currentEtapeId!)}
        if(this.defiServ.registre)
          this.visiteServ.updatingTimePoints(this.auth.pointsOfCurrentUser)
      }
  }

  changingInfoVisite(){
    this.modal.close('TempForVisiteRegistre')
    this.visiteServ.updatingTimePoints(this.auth.pointsOfCurrentUser)
    this.modal.open('Visite')
  }

}
