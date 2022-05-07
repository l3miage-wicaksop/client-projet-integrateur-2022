import { Timestamp } from "firebase/firestore";

export interface Chami{
  age:number;
  login:string;
  description:string;
  nom:string;
  ville:string;
  prenom:string;
  defis:Defi[]
  visites:Visite[]
  pointTotal:number
}


export interface Defi{
  idDefi:string
  titre:string
  description:string
  dateCreation:Timestamp
  auteur:Chami
  arret:Arret
  etapes:Etape[]
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
  dateDeVisite:Timestamp
  mode:boolean
  points:number
  score:number
  status:boolean
  temps:string
  indice:string
  commentaire:string
  chami:Chami
}
export interface Position{
  lat:number
  long:number
}

export interface Etape{
  description:string
  indice:Indice
  image:string
  question:Question
  indication:Indication
}
export interface Question{
  sujet:string
  reponses:string[]
  solution:string
  point :number
}
export interface Indice{
  indice:string
  point :number
}

export interface Indication{
  indication:string
  srcVideo:string
  srcImage:string
}
