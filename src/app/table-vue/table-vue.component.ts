import { VisitesService } from './../services/visites.service';
import { Chami, Defi, Position, Visite } from './../iterfaces';
import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { AuthServiceService } from '../services/auth-service.service';
import { AuteurVue } from '../iterfaces';
import { ModalService } from '../services/modal.service';

@Component({
  selector: 'app-table-vue',
  templateUrl: './table-vue.component.html',
  styleUrls: ['./table-vue.component.scss'],
})

export class TableVueComponent implements OnInit {


  @Input() tableChamis: Chami[]|undefined ;
  @Input() tableDefis: Defi[] |undefined;

  display: boolean = false;
  visiteWithDefi:boolean|undefined
  @Input() decider = '';
  @Input() visites:Visite[]|undefined
  @Input() mesDefis:Defi[]|undefined//we can optimise it but later
  @Input() mesVisites:Visite[]|undefined

  @Output() posEventTab = new EventEmitter<Position>();

  constructor(
    public authServ: AuthServiceService,
    private modal: ModalService,
    public visiteServ:VisitesService
  ) {}

  ngOnInit() {
    this.visiteWithDefi=false
  }

  //On click defis
  onClickDefis() {
    this.display ? (this.display = false) : (this.display = true);
  }

  openModal(defiName: string) {
    this.modal.open(defiName);
  }

  openModalParticulier(visiteID:string,defi:Defi) {
    if(visiteID==="allVisitesDeDefi"){
      this.visiteWithDefi=true
      this.visiteServ.tempDefi=defi
    }
    this.modal.open(visiteID);
    this.modal.close(defi.idDefi);
    this.visiteServ.tempDefi=defi
  }


  closeModal(name: string) {
    if(name==="allVisitesDeDefi")
      this.visiteWithDefi=false
    this.modal.close(name);
  }

  treatementDefis(text: String) {
    const regex = /\\n|\\r\\n|\\n\\r|\\r/g;
    const temp=text.replace(regex, '\n');
    return temp;
  }

  passToParentPosition(position:Position){
    this.posEventTab.emit(position)
  }


}
