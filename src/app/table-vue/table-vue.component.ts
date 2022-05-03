import { Defi, Visite } from './../iterfaces';
import { Component, Input, OnInit } from '@angular/core';
import { AuthServiceService } from '../services/auth-service.service';
import { AuteurVue } from '../iterfaces';
import { ModalService } from '../services/modal.service';

@Component({
  selector: 'app-table-vue',
  templateUrl: './table-vue.component.html',
  styleUrls: ['./table-vue.component.scss'],
})

export class TableVueComponent implements OnInit {

  tableChamis: AuteurVue[] = [];
  tableDefis: Defi[] = [];
  display: boolean = false;
  @Input() decider = '';
  @Input() Visites:Visite[]|undefined
  @Input() mesDefis:Defi[]|undefined//we can optimise it but later

  constructor(
    public authServ: AuthServiceService,
    private modal: ModalService
  ) {}

  async ngOnInit(): Promise<void> {
    await Promise.all([this.authServ.setupDefis(), this.authServ.setupUsers()]);
    await Promise.all([this.downloadChamis(), this.downloadDefis()]);
  }

  async downloadChamis() {
    this.authServ
      .getChamis()
      .then((tableChamis) => {
        this.tableChamis = tableChamis as AuteurVue[];
      })
      .catch((error) => console.log('error in download chamis ', error));
  }

  async downloadDefis() {
    // this.authServ
    //   .getDefis()
    //   .then((tableDefi) => {
    //     this.tableDefis = tableDefi as Defi[];
    //   })
    //   .catch((error) => console.log('error in download defis ', error));
    this.tableDefis=this.authServ.getDefis()
  }

  //On click defis
  onClickDefis() {
    this.display ? (this.display = false) : (this.display = true);
  }

  openModal(defiName: string) {
    this.modal.open(defiName);
  }

  closeModal(defiName: string) {
    this.modal.close(defiName);
  }

  treatementDefis(text: String) {
    const regex = /\\n|\\r\\n|\\n\\r|\\r/g;
    const temp=text.replace(regex, '\n');
    return temp;
  }
}
