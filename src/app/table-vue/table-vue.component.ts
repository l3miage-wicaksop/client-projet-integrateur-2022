import { Defi } from './../iterfaces';
import { Component, Input, OnInit } from '@angular/core';
import { AuthServiceService } from '../auth-service.service';
import { AuteurVue } from '../iterfaces';


@Component({
  selector: 'app-table-vue',
  templateUrl: './table-vue.component.html',
  styleUrls: ['./table-vue.component.scss']
})
export class TableVueComponent implements OnInit {
  tableChamis:AuteurVue[]=[]
  tableDefis:Defi[]=[]
  @Input() decider='';
  constructor(public authServ:AuthServiceService) { }

  async ngOnInit(): Promise<void> {
    await Promise.all([await this.authServ.setupDefis(), await this.authServ.setupUsers()])
    await Promise.all([await this.downloadChamis(),await this.downloadDefis()])
  }

  async downloadChamis(){
    this.authServ.getChamis().then((tableChamis)=>{
      this.tableChamis=tableChamis as AuteurVue[]
    }).catch((error)=>console.log("error in download chamis ",error))
  }
  async downloadDefis(){
    this.authServ.getDefis().then((tableDefi)=>{
      this.tableDefis=tableDefi as Defi[]
    }).catch((error)=>console.log("error in download defis ",error))
  }
}
