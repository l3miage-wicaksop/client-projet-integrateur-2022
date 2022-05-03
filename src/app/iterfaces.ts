import { Timestamp } from "firebase/firestore";

export interface Chami{
  age:number;
  login:string;
  description:string;
  nom:string;
  ville:string;
  prenom:string;
  defis:Defi[]
  visites:[]
}

export interface AuteurVue{
  auteur:string
  age:number
  defiCreated:number
}

export interface Defi{
  idDefi:string
  titre:string
  description:string
  dateCreation:Timestamp
  auteur:Chami
  arret:Arret
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
  idDefi:Defi
  dateDeVisite:Timestamp
  mode:boolean
  points:number
  score:number
  status:boolean
  temps:string
  indice:string
  commentaire:string
}
