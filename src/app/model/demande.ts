import { TypeBanque } from "./type-banque";
import { Utilisateur } from "./utilisateur";

export class Demande {
    idDemande:number;
    dateDemande:string;
    sexe:string;
    dateNaiss:string;
    lieuNaiss:string;
    numeroDemade:string;
    numeroUser:string;
    statutDemande:string;
    utilisateur : Utilisateur;
    typeBanque : TypeBanque;
    photoValide:string;
    photoDidentite:string;
    etatCivil:string;
    statutResidence:string;
}
