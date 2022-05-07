import { Component, Input, OnInit } from '@angular/core';
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
  constructor(public visiteServ:VisitesService,private modal: ModalService) { }

  ngOnInit(): void {
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


}
