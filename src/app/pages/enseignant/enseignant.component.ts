import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Enseignant } from 'app/model/enseignant';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Admin } from 'app/model/admin';
import { AuthentificationService } from 'app/service/authentification.service';
import Swal from 'sweetalert2';
import { EnseigantService } from 'app/service/enseigant.service';
import { ImageDetailComponent } from '../image-detail/image-detail.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-enseignant',
  templateUrl: './enseignant.component.html',
  styleUrls: ['./enseignant.component.scss']
})
export class EnseignantComponent implements OnInit {
  listeData:any = [];
  enseignants: Enseignant[]|any;
  displayedColumns: string[] = ['id', 'nom', 'prenom','telephone', 'etablissement','filiere', 'classe', 'email', 'diplome','nombreAbonnes', 'action'];  
  // admins: Admin []|any;

  adminConnecter: Admin|undefined ;
  dataSource!: MatTableDataSource<Enseignant>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor( private enseignantsService: EnseigantService, private _dialog: MatDialog, private authService: AuthentificationService) {
    // this.adminConnecter = this.authService.getAdminConnect();
    this.chargerDonner();
   
    
   }

   ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(){
    this.enseignantsService.update$.subscribe(() => {
      this.chargerDonner();
    });
 
  }

  chargerDonner(){
    this.enseignantsService.getEnseignantList().subscribe(
      (data) => {
        
        this.enseignants = data.filter(enseignant => enseignant.acces === true);
        this.dataSource = new MatTableDataSource(this.enseignants);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        
      },
      (error) => {
        console.error('Erreur lors du chargement de la liste des enseignants:', error);
      }
    );
  }

  agrandirImage(urlImage: string) {
    // Ouvrir le composant détaillé pour afficher l'image en plein écran
    const dialogRef = this._dialog.open(ImageDetailComponent, {
      width: '50%',height: '90%',// Ajustez la largeur et la hauteur selon vos besoins
      data: { url: urlImage }
    });
  }
  



   applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  

  //ajouter un admin

  //supprimer un admin
  onDelete(data: any){
    Swal.fire({
      title: 'Êtes-vous sûr de vouloir supprimer?',
      text: 'Vous ne pourriez plus récupérer cette enseignant!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui, supprimez-le !',
      cancelButtonText: 'Non, garde-le'
    }).then((result) => {
      if (result.value) {
        
        this.enseignantsService.deleteEnseignant(data).subscribe();
        this.enseignantsService.triggerUpdate();
        // this.chargerDonner();
        Swal.fire(
          'Supprimer!',
          'Cette enseignant a été supprimer.',
          'success'
        )
        
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Annuler',
          'Votre enseignant est en sécurité ',
          'error'
        )
      }
    })
  }

  onDesActivate(idEnseigant: number){
  Swal.fire({
    title: 'Êtes-vous sûr de vouloir de desactiver?',
    text: 'Il ne pourra plus acceder à la plateforme !',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Oui, desactive-le !',
    cancelButtonText: 'Non, garde-le'
    }).then((result) => {
      if (result.value) {
  
        this.enseignantsService.changeAccess(idEnseigant).subscribe();
        this.enseignantsService.triggerUpdate();
        Swal.fire(
          'Desactivation!',
       'Cet enseignant a été desactiver.',
       'success'
     )
        this.enseignantsService.triggerUpdate();
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Annuler',
          'Votre enseignant est en sécurité ',
          'error'
        )
      }
    })
  }


}
