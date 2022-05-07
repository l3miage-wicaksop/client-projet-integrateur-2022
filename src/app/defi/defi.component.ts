import { DefiService } from './../services/defi.service';
import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Defi } from '../iterfaces';
import { ModalService } from '../services/modal.service';
import { VisitesService } from '../services/visites.service';

@Component({
  selector: 'app-defi',
  templateUrl: './defi.component.html',
  styleUrls: ['./defi.component.scss']
})
export class DefiComponent implements OnInit {
  @Input() defi:Defi|undefined
  visiteWithDefi:boolean|undefined

  DefiForm:FormGroup|undefined
  EtapeForm:FormGroup|undefined
  EtapesForm:FormArray|undefined
  editingEtape:boolean=false
  constructor(public visiteServ:VisitesService,private modal: ModalService,private formBuilder: FormBuilder,
    private defiServ:DefiService) { }

  ngOnInit(): void {
    this.defiServ.currentDefi=this.defi!
    this.defiServ.initEditingEtapes(this.defi!.etapes.length)
  }

  initEdit(){
    this.DefiForm = this.formBuilder.group({
      titre: this.defi!.titre,
      description: this.defi!.description,
      arret: this.defi!.arret.nomArret,
      points : this.defi!.points,
    });
  }


  treatementDefis(text: String) {
    const regex = /\\n|\\r\\n|\\n\\r|\\r/g;
    const temp=text.replace(regex, '\n');
    return temp;
  }
  openModalParticulier(visiteID:string,defi:Defi) {
    if(visiteID==="allVisitesDeDefi"){
      this.visiteWithDefi=true
      this.visiteServ.tempDefi=defi
    }
    this.modal.open(visiteID);
    this.modal.close(defi.idDefi);
    this.visiteServ.tempDefi=defi
    this.openEtape()
  }

  closeModal(name: string) {
    if(name==="allVisitesDeDefi")
      this.visiteWithDefi=false
    this.modal.close(name);
  }

  openEtape(){//defi.idDefi+'-'+index de l'etape
    this.modal.open(this.defi!.idDefi+'-'+0)
    this.closeModal(this.defi!.idDefi)
  }

  openEditEtape(numEtape:number){
    this.defiServ.switchingEditEtape(numEtape)
    this.editingEtape?this.editingEtape=false:this.editingEtape=true
    const acces =this.defi?.etapes[numEtape-1]
    this.EtapeForm=this.formBuilder.group({
      description:acces!.description,
      question:acces!.question.sujet,
      solution:acces!.question.solution,
      pointForSolution:acces!.question.point,
      reponses:acces!.question.reponses,
      indice:acces!.indice.indice,
      pointForIndice:acces!.indice.point,
      image:acces!.indication.srcImage,
      video:acces!.indication.srcVideo
    })
  }

  onSubmit(){
    let tempDefi=this.defi
    tempDefi

  }

  closeModalEdit(editId: string) {
    this.defiServ.editingDefi=false
    this.modal.close(editId);//the same sing as above ,(dont know how to verify an editing id since,we dont it know ,so I just keep it  in this way)
  }
  isEditing(){
    return this.defiServ.editingDefi
  }
  etapesEditing(){
    return this.defiServ.etapesEditing
  }
}
