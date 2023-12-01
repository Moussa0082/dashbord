import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Admin } from 'app/model/admin';
import { AdministrateurService } from 'app/service/administrateur.service';
import { AuthentificationService } from 'app/service/authentification.service';
import Swal from 'sweetalert2';
import { AjoutModifierAdminComponent } from '../ajout-modifier-admin/ajout-modifier-admin.component';
import { Niveaux } from 'app/model/niveaux';
import { NiveauService } from 'app/service/niveau.service';
import { MatDialog } from '@angular/material/dialog';
import { AjoutModifierNiveauComponent } from '../ajout-modifier-niveau/ajout-modifier-niveau.component';
import { Router } from '@angular/router';
import { EnseigantService } from 'app/service/enseigant.service';
import { Enseignant } from 'app/model/enseignant';
import { Etudiant } from 'app/model/etudiant';
import { EtudiantService } from 'app/service/etudiant.service';
import { AbonnementService } from 'app/service/abonnement.service';
import { AgentService } from 'app/service/agent.service';
import { Agent } from 'app/model/agent';

@Component({
  selector: 'app-tableau-de-bord',
  templateUrl: './tableau-de-bord.component.html',
  styleUrls: ['./tableau-de-bord.component.scss']
})
export class TableauDeBordComponent implements OnInit {
  nives: Niveaux []|any;
  listeEnseignants: Enseignant[]| any;
  nbrEnseignant: number;
  listEtudiants: Etudiant[]|any;
  nbrEtudiant: number;
  totalAbonnes: number;
  totalMontantAbonnements: number;
  datasource: any;
  AdminConnecter: Admin| undefined;

  agents : Agent | any = [];

  constructor(private niveauService: NiveauService,
     private route: Router,
     private agentService: AgentService,
     private enseignantService: EnseigantService,
      private _dialog: MatDialog,
       private authService: AuthentificationService,
       private etudiantService: EtudiantService,
       private abonnementService: AbonnementService,
    ) { 
      this.AdminConnecter = this.authService.getAdminConnect();
      // console.log("Niveau Connecter est :", this.AdminConnecter);
      this.loadEtudiantList();
      this.totalAbonner();
      this.sommetotalAbonne();
      this.loadNiveauList();
    }

    




   
  
    
  ngOnInit() {
    console.log("id====",localStorage.getItem("idAdministrateur"));
    this.loadEnseignantList();
    this.counten();
    this.loadEtudiantList();
    this.totalAbonner();
    this.sommetotalAbonne();

    this.niveauService.update$.subscribe(() => {
      this.loadNiveauList();
    });

    this.agentService.getAllAgent().subscribe(
      (data) => {
        this.agents = data.filter(agent => agent.isActive === true);
      },
      (error) => {
        console.error('Erreur lors du chargement de la liste des agents:', error);
      }
    );
  }

  detailNiveau(id: number) {
    // Naviguer vers la page d'ajout de filière pour ce niveau
    this.route.navigate(['../detail-niveau', id]);
  }
// Exemple pour charger la liste des administrateurs

loadNiveauList(): void {
  this.niveauService.getNiveauList().subscribe(
    (data) => {
      this.nives = data;
      this.datasource = this.nives;
    },
    (error) => {
      console.error('Erreur lors du chargement de la liste des administrateurs:', error);
    }
  );
}

onDelete(data: any){
  Swal.fire({
    title: 'Êtes-vous sûr de vouloir supprimer?',
    text: 'Vous ne pourriez plus récupérer cet niveau !',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Oui, supprimez-le !',
    cancelButtonText: 'Non, garde-le'
  }).then((result) => {
    if (result.value) {
      // this.loadNiveauList();
      this.niveauService.deleteNiveau(data).subscribe();
      this.niveauService.triggerUpdate();
      this.loadNiveauList();
      Swal.fire(
        'Supprimer!',
        'Cet niveau a été supprimer.',
        'success'
      )
      this.niveauService.triggerUpdate();
      this.loadNiveauList();
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      Swal.fire(
        'Annuler',
        'Le niveau est en sécurité ',
        'error'
      )
    }
  })
}

// Exemple pour charger la liste des administrateurs
loadEnseignantList() {
  this.enseignantService.getEnseignantList().subscribe(
    (data) => {
      this.listeEnseignants = data;
      this.nbrEnseignant = this.counten(); // Appel à la fonction de comptage ici
      // ... le reste du code
      // console.log("nombre :" , this.nbrEnseignant);
    },
    (error) => {
      console.error('Erreur lors du chargement de la liste des enseignants:', error);
    }
  );
}

counten(): number {
  return this.listeEnseignants.reduce((total, enseignant) => {
    if (enseignant.acces == true) {
      return total + 1;
    } else {
      return total;
    }
  }, 0);
}
//nombre etudiants
// 

loadEtudiantList() {
  this.etudiantService.getEtudiantList().subscribe(
    (data) => {
      // this.etudiants = data.filter(enseignant => enseignant.acces === false);
      this.listEtudiants = data;
      this.nbrEtudiant = this.listEtudiants.length;
    }
  );
}

//Somme total des abonnée
sommetotalAbonne(){
  this.abonnementService.getTotalMontantAbonnements().subscribe(
    (data) => {
      this.totalMontantAbonnements = data;
    },
    (error) => {
      console.error('Erreur lors de la récupération du montant total des abonnements :', error);
    }
  );
}

//// Tottal des abonnées
totalAbonner(){
  this.abonnementService.getTotalAbonnes().subscribe(
    (data) => {
      this.totalAbonnes = data;
    },
    (error) => {
      console.error('Erreur lors de la récupération du nombre d\'étudiants abonnés :', error);
    }
  );

}

//+++++++++++++++++++++

refreshEnseignant() {
  // Mettez à jour vos données (par exemple, récupérez à nouveau les mesures)
  // Appel de la méthode du service pour récupérer les mesures
  this.listeEnseignants = this.enseignantService.getEnseignantList();
  
}

   refreshData() {
    // Mettez à jour vos données (par exemple, récupérez à nouveau les mesures)
    // Appel de la méthode du service pour récupérer les mesures
    this.nives = this.niveauService.getNiveauList();
    this.datasource = this.nives;
  }

  //ajouter un admin
  OpenDialogAdd(enterAnimationDuration: string, exitAnimationDuration: string){
    this._dialog.open(AjoutModifierNiveauComponent,{enterAnimationDuration,
      exitAnimationDuration});
  }

  openEditForm(data: Niveaux, enterAnimationDuration: string, exitAnimationDuration: string) {
    const dialogRef = this._dialog.open(AjoutModifierNiveauComponent,  {
      data, enterAnimationDuration,
        exitAnimationDuration
    });
  }

  
}
