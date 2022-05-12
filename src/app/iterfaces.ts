import { Timestamp } from "firebase/firestore";


export enum TypeDefi {
  enigme,
  challenge,
}

export enum TypeMode {
  distanciel,
  presentiel
}

export interface Chami{
  age:number;
  login:string;
  description:string;
  nom:string;
  ville:string;
  prenom:string;
  //defis:Defi[]
  visites:Visite[]
  pointTotal:number,
}


export interface Defi{
  idDefi:string
  titre:string
  description:string
  dateCreation:Timestamp
  auteur:Chami
  arret:Arret
  etapes:Etape[]
  points:number
  visites:Visite[]
  typeDefi:TypeDefi
}

export interface Arret{
  codeArret:string
  googlemap:string
  latitude:number
  longitude:number
  nomArret:string
  openstreetmap:string
  ville:string
}

export interface InfoDefi{
  idDefi:string
  titre:string
  lat:number
  long:number
}

export interface Visite{
  idVisite:string
  defi:Defi
  dateDebut:Timestamp
  mode:TypeMode
  score:number
  status:boolean
  temps:string
  indice:string
  commentaire:string
  chami:Chami
  pointsTotal:number

}
export interface Position{
  lat:number
  long:number
}

export interface Etape{
  idEtape:String
  description:string
  question:Question
  indication:Indication
}
export interface Question{
  questionText:string
  choixPossibles:ChoixPossible[]
  solution:string
  point :number
  indice:Indice
}
export interface Indice{
  indiceText:string
  point :number
}

export interface Indication{
  indicationText:string
  srcVideo:string
  srcImage:string
}

export interface ChoixPossible{
  choix:string
}
