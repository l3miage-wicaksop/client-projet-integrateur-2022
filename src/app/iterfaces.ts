import { Timestamp } from "firebase/firestore";

export interface Chami{
  age:number;
  login:string;
  description:string;
  nom:string;
  ville:string;
  prenom:string;
  defis:Defi[]
  visites:[  ]
}


export interface Chamis{
  all:Chami[]
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
  auteur:string
}
