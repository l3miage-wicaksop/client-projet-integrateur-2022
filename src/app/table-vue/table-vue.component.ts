import { Defi } from './../iterfaces';
import { Component, Input, OnInit } from '@angular/core';
import { AuthServiceService } from '../auth-service.service';
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
    this.authServ
      .getDefis()
      .then((tableDefi) => {
        this.tableDefis = tableDefi as Defi[];
      })
      .catch((error) => console.log('error in download defis ', error));
  }

  //On click defis
  onClickDefis() {
    console.log('ICI' + this.display);
    this.display ? (this.display = false) : (this.display = true);
    console.log('ICI' + this.display);
  }
  openModal(defiName: string) {
    this.modal.open(defiName);
  }
  closeModal(defiName: string) {
    this.modal.close(defiName);
  }

  treatementDefis(text: String) {
    var a = text.replace(/n-/g, '<br />');
    return a;

    /*   var textArray: string[] = text.split();
    console.log('HERTERWE' + textArray);
    for (let i = 0; i < textArray.length; i++) {
      if (textArray[i] === ',') textArray[i] = textArray[i] + ;
    }
    return textArray;*/
  }
}
