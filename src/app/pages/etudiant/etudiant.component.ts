import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Admin } from 'app/model/admin';
import { Enseignant } from 'app/model/enseignant';
import { AuthentificationService } from 'app/service/authentification.service';
import { EnseigantService } from 'app/service/enseigant.service';
import Swal from 'sweetalert2';
import { ImageDetailComponent } from '../image-detail/image-detail.component';
import { Etudiant } from 'app/model/etudiant';
import { EtudiantService } from 'app/service/etudiant.service';

@Component({
  selector: 'app-etudiant',
  templateUrl: './etudiant.component.html',
  styleUrls: ['./etudiant.component.scss']
})
export class EtudiantComponent implements OnInit {

  listeData:any = [];
  etudiants: Etudiant[]|any;
  displayedColumns: string[] = ['id', 'nom', 'prenom','telephone','filiere', 'classe', 'estAbonner', 'action'];  
  // admins: Admin []|any;
  abonnements: any[] = [];

  adminConnecter: Admin|undefined ;
  dataSource!: MatTableDataSource<Etudiant>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor( private etudiantsService: EtudiantService, private _dialog: MatDialog, private authService: AuthentificationService) {
    // this.adminConnecter = this.authService.getAdminConnect();
    this.chargerDonner();
    this.loadAbonnements();
   
    
   }

   ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(){
    this.etudiantsService.update$.subscribe(() => {
      this.chargerDonner();
      this.loadAbonnements();
    });
 

  }


  loadAbonnements() {
    this.etudiantsService.getEtudiantList().subscribe((etudiants) => {
      this.etudiants = etudiants;
      this.loadAbonnementsForAllEtudiants();
    });
  }

  loadAbonnementsForAllEtudiants() {
    this.etudiants.forEach((etudiant) => {
      this.etudiantsService.getAbonnementsByEtudiant(etudiant.id).subscribe((abonnements) => {
        etudiant.estAbonner = abonnements.length > 0;
      });
    });
  }



  chargerDonner(){
    this.etudiantsService.getEtudiantList().subscribe(
      (data) => {
        // this.etudiants = data.filter(enseignant => enseignant.acces === false);
        this.etudiants = data ;
        this.dataSource = new MatTableDataSource(this.etudiants);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (error) => {
        console.error('Erreur lors du chargement de la liste des etudiants:', error);
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
      text: 'Vous ne pourriez plus récupérer cet etudiant!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui, supprimez-le !',
      cancelButtonText: 'Non, garde-le'
    }).then((result) => {
      if (result.value) {
        
        this.etudiantsService.deleteEtudiant(data).subscribe(
          (response) => {
            console.log('etudiant supprimé avec succès:', response);
            // Additional logic if needed
            this.etudiantsService.triggerUpdate();
            // this.dataSource = new MatTableDataSource(this.admins);
            // this.loadAdminList();
            Swal.fire(
              'Supprimer!',
              'Cet etudiant a été supprimer.',
              'success'
            )
          },
          (error) => {
            console.error('Erreur lors de la suppression de l\'etudiant:', error);
          }
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Annuler',
          'Votre etudiant est en sécurité ',
          'error'
        )
      }
    })
  }
}
