import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Demande } from 'app/model/demande';
import { TypeBanque } from 'app/model/type-banque.js';
import { DemandeService } from 'app/service/demande.service';
import { TypeBanqueService } from 'app/service/type-banque.service';

@Component({
  selector: 'app-liste-demande-en-cours',
  templateUrl: './liste-demande-en-cours.component.html',
  styleUrls: ['./liste-demande-en-cours.component.scss']
})
export class ListeDemandeEnCoursComponent implements OnInit {

  demandes : Demande | any = [];

  constructor(private dialog:MatDialog, private demandeService: DemandeService, private route : Router) { }


  ngOnInit() : void{
    this.demandeService.getAllDemande().subscribe(
      (data) => {
        this.demandes = data.filter(demande => demande.statutDemande === "en cours");
        // console.log(this.demandes.utilisateur.nom)
        // console.log(this.demandes.utilisateur.nom)
        this.demandes.forEach(demande => {
          console.log(demande.utilisateur?.nom);
        });
      },
      (error) => {
        console.error('Erreur lors du chargement de la liste des demandes en cours:', error);
      }
    );
  }

  goToDetail(id: number): void {
    // Appel du service pour récupérer les détails d'une demande spécifique
   this.route.navigate(['/detail-demande', id]);
    
}
  // this.demandeService.getDetailDemande(id).subscribe(detailDemande => {
  //   // Utilisez les détails récupérés comme nécessaire
  //   this.demandes = detailDemande;
  //   console.log(detailDemande);

}
