import { Timestamp } from "firebase/firestore";

export interface Chami{
  age:number;
  login:string;
  description:string;
  userId:string;
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
export interface DefiVue{
  defi:string
  titre:string
  auteur:string
  date:Timestamp
}
