import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Agent } from 'app/model/agent';
import { Demande } from 'app/model/demande';
import { AgentService } from 'app/service/agent.service';
import { AuthentificationService } from 'app/service/authentification.service';
import { DemandeService } from 'app/service/demande.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detail-demande',
  templateUrl: './detail-demande.component.html',
  styleUrls: ['./detail-demande.component.scss']
})
export class DetailDemandeComponent implements OnInit {


   

   idDemande: number;
   demandeDetails:  Demande | any = [];

   demandeId: number;
   agentId: number;

   agentRecup:Agent | undefined;
 
   constructor(
    private router:Router,
     private route: ActivatedRoute,
     private demandeService: DemandeService,
     private agentService:AgentService,
     private authService:AuthentificationService
   ) {
  this.agentRecup = this.authService.getLoggedInUserInfo();
   }
 
   ngOnInit(): void {
     console.log("agent id",this.authService.getLoggedInUserInfo());
     // Récupérer l'ID de la demande à partir de l'URL
     this.idDemande = +this.route.snapshot.paramMap.get('id');
 
     // Appel du service pour récupérer les détails de la demande
     this.demandeService.getDetailDemande(this.idDemande).subscribe(detailDemande => {
       this.demandeDetails = detailDemande;
     });

   }

  //  validerDemande(demandeId:number) {
  //   const id = localStorage.getItem('userData');
    


  //   this.demandeService.validateDemande(demandeId=this.idDemande, ).subscribe(
  //     (response) => {
  //       console.log('Demande validée avec succès :', response);
  //       // Gérer la validation réussie ici, par exemple, afficher un message à l'utilisateur
  //     },
  //     (error) => {
  //       console.error("Erreur lors de la validation de la demande :", error);
  //       // Gérer l'erreur ici si nécessaire
  //     }
  //   );
  // }
  validerDemande() {
    const idAgentString = localStorage.getItem('userData');
    const idAgent = idAgentString ? parseInt(JSON.parse(idAgentString).userData.idAgent, 10) : null;
  
    if (!isNaN(idAgent)) {
      this.demandeService.validateDemande(this.idDemande, idAgent).subscribe(
        (response) => {
          
          Swal.fire('Succès !...',  'Demande valider avec succès', 'success');
          this.router.navigate(['/demandes-valide']);
          console.log('Demande validée avec succès :', response);
          // Gérer la validation réussie ici, par exemple, afficher un message à l'utilisateur
        },
        (error) => {
          console.error("Erreur lors de la validation de la demande :", error);
          // Gérer l'erreur ici si nécessaire
        }
      );
    } else {
      console.error("Impossible de récupérer un ID d'agent valide depuis le localStorage.");
      // Gérer le cas où l'ID de l'agent n'est pas un nombre valide
    }
  }

  
  rejeterDemande() {
    const idAgentString = localStorage.getItem('userData');
    const idAgent = idAgentString ? parseInt(JSON.parse(idAgentString).userData.idAgent, 10) : null;
  
    if (!isNaN(idAgent)) {
      Swal.fire({
        title: 'Êtes-vous sûr ?',
        text: 'Voulez-vous vraiment rejeter cette demande ?',
        icon: 'warning',
        showCancelButton: true,
        cancelButtonText: 'Annuler',
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Oui, rejeter la demande!',
      }).then((result) => {
        if (result.value) {
          this.demandeService.rejeterDemande(this.idDemande, idAgent).subscribe(
            (response) => {
              this.router.navigate(['/demandes-en-cours']);
              console.log('Demande rejetée avec succès :', response);
              // Gérer le rejet réussi ici, par exemple, afficher un message à l'utilisateur
            },
            (error) => {
              console.error("Erreur lors du rejet de la demande :", error);
              // Gérer l'erreur ici si nécessaire
            }
          );
        } else {
          Swal.fire(
            'Rejet annulé!',
            'Le rejet de la demande a été annulé.',
            'error'
          );
        }
      });
    } else {
      console.error("Impossible de récupérer un ID d'agent valide depuis le localStorage.");
    }
  }
  
  



}
