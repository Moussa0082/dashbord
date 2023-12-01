import { Filiere } from "./filiere.model";

export interface Classe {
    idClasse: number;
    nom:      string;
    montant:  number;
    filiere:  Filiere;
}