import { VisitesService } from './../services/visites.service';
import { PostService } from './../services/post.service';
import { ModalService } from './../services/modal.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Defi, Visite,Position, Chami } from '../iterfaces';
import { Timestamp } from 'firebase/firestore';
import {  lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-visites',
  templateUrl: './visites.component.html',
  styleUrls: ['./visites.component.scss']
})
export class VisitesComponent implements OnInit {

  @Output() posEvent = new EventEmitter<Position>();
  bodyText: string | undefined;
  @Input() chami:Chami|undefined
  @Input() allVisites:Visite[]|undefined
  visite:Visite | undefined

  commentVisite:string|undefined
  indiceVisite:string|undefined

  @Input() defi:Defi|undefined

  visiteForm = this.formBuilder.group({
    indice: '',
    comment: ''
  });



  constructor(private formBuilder: FormBuilder,private modalService:ModalService,private post:PostService,
    public visiteServ:VisitesService) {


    }

 async ngOnInit() {
      this.bodyText = 'Thanks for your visite';
      this.allVisites=this.visiteServ.getVisites()
      this.createVisite(this.defi!!)
      this.outPutEventPosition()
  }

  openModal(id: string) {
      this.modalService.open(id);
  }

  closeModal(id: string) {
      this.modalService.close(id);
  }

  onSubmit(): void {
    // Process checkout data here
    console.warn('Your order has been submitted', this.visiteForm.value);

    const commentAndVisite=this.visiteForm.value
    this.setCommentVisite(commentAndVisite.comment)
    this.setIndiceVisite(commentAndVisite.indice)
    this.post.postingVisitePromise(this.visite!!).then(respose=>{
      respose?console.log("ok,we posted visite in db"):console.log("error ,post viste doesnt have status 200")
    })
    this.visiteForm.reset();
    if(this.visite?.idVisite)
      this.closeModal(this.visite?.idVisite)//this.trigger
  }

  async createVisite(defi:Defi)
  { try{

      const temp=this.allVisites![this.allVisites!.length-1].idVisite.substring(1)
      var visiteNum=Number(temp)+1
      var visiteStr=this.allVisites!.length===0?'V1':String(visiteNum)
      const time=Timestamp.now()
      this.visite={chami:this.chami!,indice:"",commentaire:"",defi:defi,idVisite:visiteStr,dateDeVisite:time,points:1,score:0,temps:'0',mode:false,status:true}
      this.setCurrentVisite(this.visite!)
    }
    catch{
      console.log("Havent been created because visites have not created")
    }

  }

  setCurrentVisite(visite:Visite){
    this.visite=visite
  }

  setCommentVisite(comment:string){
    this.visite?.commentaire!!=comment
  }

  setIndiceVisite(indice:string){
    this.visite?.indice!!=indice
  }

  outPutEventPosition(){
    const lat=this.visiteServ.userLat
    const long=this.visiteServ.userLong
    const temp={lat,long} as Position
    this.posEvent.emit(temp)
  }

}
