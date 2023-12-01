export interface Enseignant {
  idEnseignant:  number;
  nom:           string;
  prenom:        string;
  etablissement: string;
  telephone:     string;
  diplome:       string;
  acces:         boolean;
  email:         string;
  motDePasse:    string;
  classe:        string;
  apropos:       string;
  nombreAbonnes: number;
}