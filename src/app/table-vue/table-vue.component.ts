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


  @Input() tableChamis: AuteurVue[]|undefined ;
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
    // this.tableChamis=this.authServ.getChamis()
    // this.tableDefis=this.authServ.getDefis()
  }

  // async downloadChamis() {
  //   this.authServ
  //     .getChamis()
  //     .then((tableChamis) => {
  //       this.tableChamis = tableChamis as AuteurVue[];
  //     })
  //     .catch((error) => console.log('error in download chamis ', error));
  // }

  // async downloadDefis() {
  //   // this.authServ
  //   //   .getDefis()
  //   //   .then((tableDefi) => {
  //   //     this.tableDefis = tableDefi as Defi[];
  //   //   })
  //   //   .catch((error) => console.log('error in download defis ', error));
  //   this.tableDefis=this.authServ.getDefis()
  // }

  //On click defis
  onClickDefis() {
    this.display ? (this.display = false) : (this.display = true);
  }

  openModal(defiName: string) {
    this.modal.open(defiName);
  }

  openModalParticulier(visiteID:string,defi:Defi) {
    if(visiteID==="allVisitesDeDefi"){
      console.log("zdes ok")
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

  getVisites(){
    if(this.visites===undefined)
      return []
    else return this.visites

  }
}
