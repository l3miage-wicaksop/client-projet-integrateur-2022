import { DeleteService } from './delete.service';
import { PutService } from './put.service';
import { PostService } from './post.service';
import { Injectable } from '@angular/core';
import { Defi } from '../iterfaces';
import { ModalService } from './modal.service';

@Injectable({
  providedIn: 'root'
})
export class DefiService {

  currentDefi:Defi|undefined
  editingDefi:boolean=false
  etapesEditing:boolean[]=[]
  creatingDefi:boolean=false

  registre:boolean=false

  constructor(private post :PostService,private put :PutService,private deleting:DeleteService,
    public modal:ModalService) {}

  initEditingEtapes(numEtapes:number){
    this.etapesEditing.fill(false,0,numEtapes)
  }

  switchingEditEtape(indexEtape:number){
    this.etapesEditing[indexEtape]?!this.etapesEditing[indexEtape]:this.etapesEditing[indexEtape]
  }

  updateDefi(defi:Defi){
    this.put.updateDefi(this.currentDefi!.idDefi,defi)
    this.currentDefi=defi
  }

  addDefi(defi:Defi){
    this.post.postingDefiPromise(defi)
    this.creatingDefi=false
  }
  deleteDefi(defi:Defi){
    this.deleting.deleteDefi(defi.idDefi)
  }

  openEtape(idDefi:string){//defi.idDefi+'-'+index de l'etape
    console.log("openEtap in defi ->",idDefi+'-'+'first')
    console.log(this.modal)
    this.modal.open(idDefi+'-'+'first')//this.defiOfEtape?.idDefi+"-"+"first"
    this.modal.close(idDefi)
  }

}
