import { Banque } from "./banque";

export class Agent {

  idAgent : number;
  nom: String;
  prenom: String;
  email: String;
  isActive: boolean;
  motDePasse: string;
  banque:Banque;
}
