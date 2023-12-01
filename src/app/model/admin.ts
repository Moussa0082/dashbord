import { Banque } from "./banque";

export class Admin {
    idAdmin: number;
    nom:              string;
    prenom:           string;
    email:            string;
    isActive:         boolean;
    motDePasse:       string;
    banque:Banque;
}
