import { VisitesService } from './../services/visites.service';
import { PostService } from './../services/post.service';
import { ModalService } from './../services/modal.service';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Defi, Visite } from '../iterfaces';
import { Timestamp } from 'firebase/firestore';

@Component({
  selector: 'app-visites',
  templateUrl: './visites.component.html',
  styleUrls: ['./visites.component.scss']
})
export class VisitesComponent implements OnInit {

  bodyText: string | undefined;
  allVisites:Visite[]=[]
  visite:Visite|undefined

  commentVisite:string|undefined
  indiceVisite:string|undefined

  @Input() defi:Defi|undefined

  visiteForm = this.formBuilder.group({
    indice: '',
    comment: ''
  });



  constructor(private formBuilder: FormBuilder,private modalService:ModalService,private post:PostService,
    private visiteServ:VisitesService) {


    }

 async ngOnInit() {
      this.bodyText = 'Thanks for your visite';
      await this.visiteServ.getVisites().then(val=>{this.allVisites=val})
      this.createVisite(this.defi!!)
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
    this.post.postingVisite(this.visite!!)
    this.visiteForm.reset();
    if(this.visite?.idVisite)
      this.closeModal(this.visite?.idVisite)//this.trigger
    this.visite=undefined
  }

  createVisite(defi:Defi)
  {
    const temp=this.allVisites[this.allVisites.length-1].idVisite.substring(1)
    var visiteNum=Number(temp)+1
    var visiteStr=this.allVisites.length===0?'V1':String(visiteNum)
    const time=Timestamp.now()
    this.visite={indice:"",commentaire:"",idDefi:defi,idVisite:visiteStr,dateDeVisite:time,points:1,score:0,temps:'0',mode:false,status:true}
    this.setCurrentVisite(this.visite)

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

}
