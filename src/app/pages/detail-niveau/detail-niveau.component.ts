import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Niveaux } from 'app/model/niveaux';
import { NiveauService } from 'app/service/niveau.service';
import { AjoutModifierFiliereComponent } from '../ajout-modifier-filiere/ajout-modifier-filiere.component';
import { FiliereService } from 'app/service/filiere.service';
import { Filiere } from 'app/model/filiere.model';
import { ModifierfiliereComponent } from '../modifierfiliere/modifierfiliere.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detail-niveau',
  templateUrl: './detail-niveau.component.html',
  styleUrls: ['./detail-niveau.component.scss']
})
export class DetailNiveauComponent implements OnInit {
  niveau: Niveaux;
  filieres: Filiere[]|any;
  constructor(private _dialog: MatDialog ,
    private niveauService: NiveauService,
     private route: ActivatedRoute,
     private router: Router,
     private filiereService: FiliereService ) { 
      this.chargeniveau();
     }

  ngOnInit() {

    this.filiereService.update$.subscribe(() => {
      this.chargeniveau();
    });
    
  }

  chargeniveau(){
    this.route.paramMap.subscribe(params => {
      const id = +params.get('id'); // Convertir l'ID en nombre
      this.niveauService.getNiveauById(id).subscribe(niveau => this.niveau = niveau);
      this.loadFilieres(id);
    });
  }

  onDelete(data: any){
    Swal.fire({
      title: 'Êtes-vous sûr de vouloir supprimer?',
      text: 'Vous ne pourriez plus récupérer cette filiere !',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui, supprimez-le !',
      cancelButtonText: 'Non, garde-le'
    }).then((result) => {
      if (result.value) {
        this.filiereService.triggerUpdate();
        
        this.filiereService.supprimerFiliere(data).subscribe();
        // this.niveauService.triggerUpdate();
        this.filiereService.triggerUpdate();
        // this.route.paramMap.subscribe(params => {
        //   const id = +params.get('id'); // Convertir l'ID en nombre
        //   this.niveauService.getNiveauById(id).subscribe(niveau => this.niveau = niveau);
        //   this.loadFilieres(id);
        // });
        Swal.fire(
          'Supprimer!',
          'cette filiere a été supprimer.',
          'success'
        )
        this.filiereService.triggerUpdate();
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Annuler',
          'Le filiere est en sécurité ',
          'error'
        )
      }
    })
  }

  loadFilieres(niveauId: number): void {
    this.filiereService.getFilieresByNiveau(niveauId).subscribe(
      (filieres: any[]) => {
        this.filieres = filieres;
      },
      (error) => {
        console.error('Erreur lors du chargement des filières', error);
        // Gérer l'erreur selon vos besoins
      }
    );
  }
 

  OpenDialogAdd(data: Niveaux, enterAnimationDuration: string, exitAnimationDuration: string){
    this._dialog.open(AjoutModifierFiliereComponent,{
      data, enterAnimationDuration,
      exitAnimationDuration});
  }

  openEditForm(data: Filiere, enterAnimationDuration: string, exitAnimationDuration: string) {

    const dialogRef = this._dialog.open(ModifierfiliereComponent,  {
      data, enterAnimationDuration,
        exitAnimationDuration
    });
    
  }


}
