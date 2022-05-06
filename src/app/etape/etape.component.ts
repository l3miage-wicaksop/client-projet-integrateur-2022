import { AuthentificationComponent } from './../authentification/authentification.component';
import { VisitesService } from './../services/visites.service';
import { Defi, Etape, Visite } from './../iterfaces';
import { Component, Input, OnInit } from '@angular/core';
import { ModalService } from '../services/modal.service';
import { AuthServiceService } from '../services/auth-service.service';

@Component({
  selector: 'app-etape',
  templateUrl: './etape.component.html',
  styleUrls: ['./etape.component.scss']
})
export class EtapeComponent implements OnInit {
  @Input() defiOfEtape:Defi|undefined
  @Input() etape:Etape|undefined

  usingIndice=false
  visiteServInEtape: any;
  constructor(private modal: ModalService,private auth:AuthServiceService) { }

  ngOnInit(): void {
  }

  useIndice(){
    this.usingIndice=true
    //do - points in visites
    this.auth.decreasePointOfUser(this.etape!.indice.point)
  }

}
