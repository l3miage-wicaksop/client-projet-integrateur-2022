import { Defi, DefiVue } from './../iterfaces';
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
  tableDefisVue:DefiVue[]=[]
  @Input() decider='';
  constructor(public authServ:AuthServiceService) { }

  async ngOnInit(): Promise<void> {
    await Promise.all([ this.authServ.setupDefis(),  this.authServ.setupUsers()])
    await Promise.all([ this.downloadChamis(), this.downloadDefis()])
    await this.downloadDefisVue()
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
  async downloadDefisVue(){
    this.authServ.getDefisVue().then((tableDefi)=>{
      this.tableDefisVue=tableDefi  as DefiVue[] //I dont know but it sends duplicate values every time ,couldn't resolve that ez problem
      this.tableDefisVue=this.tableDefisVue.filter((element,index,arr)=>{
        return (index%2===0)
      })
    }).catch((error)=>console.log("error in download defis ",error))
  }
}
