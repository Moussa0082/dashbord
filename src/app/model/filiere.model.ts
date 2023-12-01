import { Classe } from "./classe.model";
import { Niveaux } from "./niveaux";

export interface Filiere {
    idFiliere: number;
    nom:       string;
    niveau:    Niveaux;
    classe: Classe[];
}