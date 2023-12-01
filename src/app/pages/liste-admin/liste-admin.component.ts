import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Admin } from 'app/model/admin';
import { AdministrateurService } from 'app/service/administrateur.service';
import Swal from 'sweetalert2';
import { AjouteAdminComponent } from '../ajoute-admin/ajoute-admin.component';

@Component({
  selector: 'app-liste-admin',
  templateUrl: './liste-admin.component.html',
  styleUrls: ['./liste-admin.component.scss']
})
export class ListeAdminComponent implements OnInit {

  listeData:any = [];
  admins: Admin | any = [];
  idAdmin : NumberConstructor;
  constructor(private dialog:MatDialog, private adminService : AdministrateurService) { }




  ngOnInit() : void{
    this.chargerDonner();
    this.adminService.getAdminList().subscribe(
      (data) => {
        this.admins = data;
        console.log(this.admins)
      },
      (error) => {
        console.error('Erreur lors du chargement de la liste des adminstrateurs:', error);
      }
    );
  }


  openDialog() {
    const dialogRef = this.dialog.open(AjouteAdminComponent,{
      // width: '650px',
      // height:'570px',
    });
    }

    chargerDonner(){
    
      this.adminService.getAdminList().subscribe(
        (data) => {
          this.admins = data;
        },
        (error) => {
          console.error('Erreur lors du chargement de la liste des administrateurs:', error);
        }
      );
    }

      // Exemple pour activer un administrateur
  onDesActivate(idAdmin: number){
    Swal.fire({
      title: 'Êtes-vous sûr de vouloir desactiver cet admin?',
      text: 'Il ne pourra plus acceder à la plateforme !',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui, desactive-le !',
      cancelButtonText: 'Non, garde-le'
    }).then((result) => {
      if (result.value) {
        this.adminService.disableAdmin(idAdmin).subscribe();
         // Réalisez une action en cas de succès (rafraîchir la liste par exemple)
         this.adminService.triggerUpdate();
         this.chargerDonner();
         Swal.fire(
          'Desactivation!',
       'Cet admin a été desactivé.',
       'success'
     )
     this.adminService.triggerUpdate();
         this.chargerDonner();
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Annuler',
          'Desactivation annuler ',
          'error'
        )
      }
    })
  }
  
  onActivate(idAdmin: number){
    Swal.fire({
      title: 'Êtes-vous sûr de vouloir activer cet admin?',
      text: 'Il pourra acceder à la plateforme !',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: "Oui, l'activer !",
      cancelButtonText: 'Non, le garder desactiver'
    }).then((result) => {
      if (result.value) {
        
        this.adminService.enableAdmin(idAdmin).subscribe();
         // Réalisez une action en cas de succès (rafraîchir la liste par exemple)
         this.adminService.triggerUpdate();
         this.chargerDonner();
         Swal.fire(
          'Activation!',
       'Cet admin a été activé.',
       'success'
     )
     this.adminService.triggerUpdate();
         this.chargerDonner();
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Annuler',
          'Activation annuler ',
          'error'
        )
      }
    })
  }

}
