import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Demande } from 'app/model/demande';
import { DemandeService } from 'app/service/demande.service';

@Component({
  selector: 'app-liste-demande-annule',
  templateUrl: './liste-demande-annule.component.html',
  styleUrls: ['./liste-demande-annule.component.scss']
})
export class ListeDemandeAnnuleComponent implements OnInit {

  demandes : Demande | any = [];

  constructor(private dialog:MatDialog, private demandeService: DemandeService) { }


  ngOnInit() : void{
    this.demandeService.getAllDemande().subscribe(
      (data) => {
        this.demandes = data.filter(demande => demande.statutDemande === "annulée");
        console.log(this.demandes)
      },
      (error) => {
        console.error('Erreur lors du chargement de la liste des demandes annuler:', error);
      }
    );

    
  }

  

}
