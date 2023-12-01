import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Admin } from 'app/model/admin';
import { AdministrateurService } from 'app/service/administrateur.service';
import { AuthentificationService } from 'app/service/authentification.service';
import { AjoutModifierAdminComponent } from '../ajout-modifier-admin/ajout-modifier-admin.component';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-administrateur',
  templateUrl: './administrateur.component.html',
  styleUrls: ['./administrateur.component.scss']
})
export class AdministrateurComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nom', 'prenom', 'email', 'action'];  
  admins: Admin []|any;

  adminConnecter: Admin|undefined ;
 
  listeData:any = [];
  dataSource!: MatTableDataSource<Admin>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor( private adminService: AdministrateurService,private _dialog: MatDialog, private authService: AuthentificationService) {
    this.adminConnecter = this.authService.getAdminConnect();
    this.loadAdminList();
    this.dataSource = new MatTableDataSource(this.admins);
   }

   ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(){
   
   this.adminService.update$.subscribe(() => {
    this.loadAdminList();
  });
  }

// Exemple pour charger la liste des administrateurs
loadAdminList(): void {
  this.adminService.getAdminList().subscribe(
    (data) => {
      this.admins = data;

      this.dataSource = new MatTableDataSource(this.admins);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    },
    (error) => {
      console.error('Erreur lors du chargement de la liste des administrateurs:', error);
    }
  );
}

  //  refreshData() {
  //   // Mettez à jour vos données (par exemple, récupérez à nouveau les mesures)
  //   // Appel de la méthode du service pour récupérer les mesures
  //   this.adminService.triggerUpdate();
  //   this.admins = this.adminService.getAdminList();
  //   this.dataSource = new MatTableDataSource(this.admins);
  //   this.dataSource.paginator = this.paginator;
  //   this.dataSource.sort = this.sort;
  // }
 

   applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  

  //ajouter un admin
  OpenDialogAdd(enterAnimationDuration: string, exitAnimationDuration: string){
    this._dialog.open(AjoutModifierAdminComponent,{enterAnimationDuration,
      exitAnimationDuration});
  }

  //supprimer un admin
  // onDelete(data: any){
  //   Swal.fire({
  //     title: 'Êtes-vous sûr de vouloir supprimer?',
  //     text: 'Vous ne pourriez plus récupérer cette admin!',
  //     icon: 'warning',
  //     showCancelButton: true,
  //     confirmButtonText: 'Oui, supprimez-le !',
  //     cancelButtonText: 'Non, garde-le'
  //   }).then((result) => {
  //     if (result.value) {
        
  //       this.adminService.deleteAdmin(data).subscribe(
  //         (response) => {
  //           console.log('Admin supprimé avec succès:', response);
  //           // Additional logic if needed
  //           this.adminService.triggerUpdate();
  //           // this.dataSource = new MatTableDataSource(this.admins);
  //           // this.loadAdminList();
  //           Swal.fire(
  //             'Supprimer!',
  //             'Cette admin a été supprimer.',
  //             'success'
  //           )
  //         },
  //         (error) => {
  //           console.error('Erreur lors de la suppression de l\'administrateur:', error);
  //         }
  //       );
  //     } else if (result.dismiss === Swal.DismissReason.cancel) {
  //       Swal.fire(
  //         'Annuler',
  //         'Votre admin est en sécurité ',
  //         'error'
  //       )
  //     }
  //   })
  // }

   // Exemple pour supprimer un administrateur
  

}
