import { DefiService } from './../services/defi.service';
import { VisitesService } from './../services/visites.service';
import { PostService } from './../services/post.service';
import { ModalService } from './../services/modal.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Defi, Visite,Position, Chami, TypeMode } from '../iterfaces';
import { Timestamp } from 'firebase/firestore';
import { AuthServiceService } from '../services/auth-service.service';



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
  visite:any | undefined

  commentVisite:string|undefined
  indiceVisite:string|undefined

  dateStart:any|undefined

  @Input() defi:Defi|undefined

  visiteForm = this.formBuilder.group({
    indice: '',
    comment: '',
    typeMode:''
  });



  constructor(private formBuilder: FormBuilder,private modalService:ModalService,private post:PostService,
    public visiteServ:VisitesService,private defiServ:DefiService,private auth:AuthServiceService) {
    }

  ngOnInit() {
    this.post.Refreshrequired.subscribe(
      response=>{
        if(this.visiteServ.currentVisite){
          this.createVisite(this.defi!)
        }
        else{
          this.visite=this.visiteServ.currentVisite
        }})
    this.bodyText = 'Thanks for your visite';
    this.allVisites=this.visiteServ.getVisites()
    this.outPutEventPosition()
  }

  openModal(id: string) {
      this.modalService.open(id);
  }

  closeModal(id: string) {
      this.defiServ.openEtape(this.defiServ.currentDefi!.idDefi)
      this.modalService.close(id);
  }

  onSubmit(): void {
    // Process checkout data here
    console.warn('Your order has been submitted', this.visiteForm.value);

    const commentAndVisite=this.visiteForm.value
    // this.setCommentVisite(commentAndVisite.comment)
    // this.setIndiceVisite(commentAndVisite.indice)
    let temp=this.visiteForm.value
    temp.mode="distanciel"
    let dateDebut=new Date()
    this.dateStart=dateDebut
    let dateFin=new Date()
    const visiting={defi:{idDefi:this.defiServ.currentDefi!.idDefi},titre:temp.titre,visiteur:{login:this.auth.loginUser},dateDebut:dateDebut,dateFin:dateFin,mode:true,comment:temp.comment,indice:temp.indice,status:false,temp:"Visite instantané"}
    //this.visite!.mode=TypeMode.distanciel// this.getMode(commentAndVisite.mode)
    console.log("visite to be created",visiting)
    this.post.postingVisitePromise(visiting).then(respose=>{
      respose?console.log("ok,we posted visite in db"):console.log("error ,post viste doesnt have status 200")
    })
    this.visiteForm.reset();
    this.closeModal('Visite')
  }

  async createVisite(defi:Defi){
    try{
      let temp=this.visiteForm.value
      temp.mode="distanciel"
      let dateDebut=this.dateStart
      let dateFin=new Date()
      const visiting={defi:{idDefi:this.defiServ.currentDefi!.idDefi},titre:temp.titre,visiteur:{login:this.auth.loginUser},dateDebut:dateDebut,dateFin:dateFin,mode:true,comment:temp.comment,indice:temp.indice,status:false,temp:"Visite instantané"}
      //const visiting={defi:{idDefi:this.defiServ.currentDefi!.idDefi},titre:temp.titre,visiteur:{login:this.auth.loginUser},dateDebut:dateDebut,dateFin:dateFin,mode:true,comment:temp.comment,indice:temp.indice,status:false,temp:"Visite instantané"}
        //this.visite={chami:this.chami!,indice:"",commentaire:"",defi:defi,idVisite:visiteStr,dateDebut:time,pointsTotal:0,score:0,temps:'0',mode:TypeMode.distanciel,status:false}
      //status ->finished not ->finished.Pour l'instant seulment distanciel mode
      this.setCurrentVisite(this.visite)
    }
    catch{
      console.log("Havent been created because visites are not created")
    }
  }

  setCurrentVisite(visite:any){
    this.visite=visite
    this.visiteServ.currentVisite=visite
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

   getMode(mode:string){
     if(mode==='dist')
      return TypeMode.distanciel
     return TypeMode.presentiel
   }

}
