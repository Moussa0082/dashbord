import { Component, OnInit } from '@angular/core';
import { AbonnementService } from 'app/service/abonnement.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-abonnement',
  templateUrl: './abonnement.component.html',
  styleUrls: ['./abonnement.component.scss']
})
export class AbonnementComponent implements OnInit {
  abonnements: any[] = [];
  constructor(
    private abonService: AbonnementService,
  ) { }

  ngOnInit(): void {
    this.loadNiveauList();
  }

  loadNiveauList(): void {
    this.abonService.getAllAbonnement().subscribe(
      (data) => {
        this.abonnements = data;
        this.abonService.update$.subscribe();
        console.log("abonnement :", this.abonnements);
      },
      (error) => {
        console.error('Erreur lors du chargement de la liste des administrateurs:', error);
      }
    );
  }

   //supprimer un abonnement
   onDelete(data: any){
    Swal.fire({
      title: 'Êtes-vous sûr de vouloir supprimer?',
      text: 'Vous ne pourriez plus récupérer cet abonnement!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui, supprimez-le !',
      cancelButtonText: 'Non, garde-le'
    }).then((result) => {
      if (result.value) {

        this.abonService.triggerUpdate();
        this.loadNiveauList();
        this.abonService.supprimerAbonnement(data).subscribe();
        this.abonService.triggerUpdate();
        this.loadNiveauList();
        Swal.fire(
          'Supprimer!',
          'Cet abonnement a été supprimer.',
          'success'
        )
        this.abonService.triggerUpdate();
        this.loadNiveauList();
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Annuler',
          ' Abonnement est en sécurité ',
          'error'
        )
      }
    })
  }

}
