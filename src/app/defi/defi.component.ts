import { Timestamp } from 'firebase/firestore';
import { Etape, TypeDefi, Question, Indice, Indication, Visite } from './../iterfaces';
import { DefiService } from './../services/defi.service';
import { Component, Input, OnInit } from '@angular/core';
import { Form, FormArray, FormBuilder, FormGroup } from '@angular/forms';
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

  DefiForm:FormGroup=this.formBuilder.group({
    titre: '',
    description: '',
    arret: '',
    points : '',
    typeDefi:'',
    etapes:new FormArray([])
  });
  EtapeForm:FormGroup=this.formBuilder.group({
    description:'',
    question:'',
    solution:'',
    pointForSolution:'',
    reponses:'',
    indice:'',
    pointForIndice:'',
    image:'',
    video:'',
    indication:''
  })

  DefiCreating:FormGroup=this.formBuilder.group({
    titre: '',
    description: '',
    arret: '',
    points : '',
    typeDefi:'',
    etapes:new FormArray([])
  });
  EtapeCreating:FormGroup=this.formBuilder.group({
    descriptionC:'',
    question:'',
    solution:'',
    pointForSolution:'',
    reponses:'',
    indice:'',
    pointForIndice:'',
    image:'',
    video:'',
    indication:''
  })

  EtapesForm:FormArray|undefined
  public EtapesCreatingForm:FormArray=new FormArray([])
  //Cannot use the same form

  editingEtape:boolean=false

  numOfEtapesToCreate=0
  tempArray: number[]=[]
  constructor(public visiteServ:VisitesService,private modal: ModalService,private formBuilder: FormBuilder,
    private defiServ:DefiService) { }

  ngOnInit(): void {
    if(this.numOfEtapesToCreate!=0 &&this.numOfEtapesToCreate>0 ){
      this.defiServ.creatingDefi=true
      //this.tempArray=new Array(this.numOfEtapesToCreate)
      //this.tempArray=Array.from(Array(this.numOfEtapesToCreate).keys())
      //console.log("creating temp Array",this.numOfEtapesToCreate)
      //console.log(this.tempArray)
    }
    else{
      this.defiServ.creatingDefi=false
    }
    this.defiServ.currentDefi=this.defi!
    if(this.defiServ.editingDefi || this.defiServ.creatingDefi){
      this.initEdit()
    }
    //this.defiServ.initEditingEtapes(this.defi!.etapes.length)
  }

  initEdit(){
    this.DefiForm = this.formBuilder.group({
      titre: this.defi!.titre,
      description: this.defi!.description,
      arret: this.defi!.arret.nomArret,
      points : this.defi!.points,
      typeDefi:'',
      etapes:new FormArray([])
    });
    if(!this.defiServ.creatingDefi){
      for (let i =1;i<=this.defi!.etapes.length;i++){
        this.etapesFormArray.push(this.openEditEtape(i))
      }
      console.log("Creating etapes for editing")
    }
    else{
      let i=this.etapesFormArrayCreating.controls.length
      for (i;i<this.numOfEtapesToCreate;i++){
        this.etapesFormArrayCreating.push(this.createEtape())
      }
      console.log("Creating etapes for creating")
    }
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
    this.openEtape()//I hope it will open after registration visite close
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
      video:acces!.indication.srcVideo,
      indication:acces!.indication.indication
    })
    return this.EtapeForm
  }

  createEtape(){
    this.editingEtape?this.editingEtape=false:this.editingEtape=true
    this.EtapeCreating=this.formBuilder.group({
      descriptionC:'',
      question:'',
      solution:'',
      pointForSolution:'',
      reponses:'',
      indice:'',
      pointForIndice:'',
      image:'',
      video:'',
      indication:''
    })
    return this.EtapeCreating
  }

  onSubmitEdit(){
    let tempDefi=this.DefiForm!.value //as Defi
    tempDefi.idDefi=this.defi!.idDefi
    tempDefi.dateCreation=this.defi!.dateCreation
    tempDefi.visites=this.defi!.visites
    tempDefi=this.installEtapes(tempDefi)
    //put
    this.defiServ.updateDefi(tempDefi)
    this.closeModalEdit(this.defi!.idDefi+'-edit')
  }

  onSubmitCreate(){
    let tempDefi=this.DefiForm!.value
    tempDefi.dateCreation=Timestamp.now()
    tempDefi.visites=[] as Visite[]
    tempDefi=this.installEtapes(tempDefi)
    //post
    this.defiServ.addDefi(tempDefi)
    this.closeModalCreating()
  }

  installEtapes(tempDefi:any){
    let tempType=TypeDefi.challenge
    if(tempDefi.typeDefi.toLowerCase()==="enigme")
       tempType =TypeDefi.enigme
    tempDefi.typeDefi=tempType
    let etapesG:Etape[]=[]
    tempDefi.etapes.forEach((element:
      {descriptionC: any,question:any,indice:any,
      solution :any,pointForIndice:any,
      pointForSolution:any,reponses:any,
      indication:any,srcVideo:any,srcImage:any }) =>
      {
        const question={sujet:element.question,solution:element.solution,point:element.pointForSolution,reponses:element.reponses} as Question
        const indice ={indice:element.indice,point:element.pointForIndice} as Indice
        const indication={indication:element.indication,srcVideo:element.srcVideo,srcImage:element.srcImage} as Indication
        const etape={description :element.descriptionC,question:question,indice:indice,indication:indication} as Etape
        etapesG.push(etape)
    });
    //Arret
    tempDefi.arret={nomArret:tempDefi.arret}
    //Should I write an algo to get the code of arret from Db?
    tempDefi=tempDefi as Defi
    tempDefi.etapes=etapesG
    this.etapesFormArray.clear()
    this.EtapeForm!.reset()
    return tempDefi
  }


  closeModalEdit(editId: string) {
    this.defiServ.editingDefi=false
    this.modal.close(editId);
  }

  closeModalCreating(){
    this.defiServ.creatingDefi=false
    this.numOfEtapesToCreate=0
    this.modal.close("DefiCreation")
  }
  isEditing(){
    return this.defiServ.editingDefi
  }
  etapesEditing(){
    return this.defiServ.etapesEditing
  }

  get etapesFormArray(){
    this.EtapesForm=this.DefiForm!.get('etapes') as FormArray
    return this.EtapesForm
  }

  get etapesFormArrayCreating(){
    this.EtapesCreatingForm=this.DefiCreating!.get('etapes') as FormArray
    return this.EtapesCreatingForm
  }

  set etapesFormArrayCreating(arr:any){
    this.DefiCreating.patchValue({etape:arr})//
    this.EtapesCreatingForm=arr
  }

  isCreating(){
    return this.defiServ.creatingDefi;
  }
  changeCreating(){
    this.defiServ.creatingDefi=!this.defiServ.creatingDefi
  }
  trackByIndex(index:number,item:any){
    return index;
  }
}
