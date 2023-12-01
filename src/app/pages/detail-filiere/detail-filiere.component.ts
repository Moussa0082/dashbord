import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Classe } from 'app/model/classe.model';
import { Filiere } from 'app/model/filiere.model';
import { ClasseService } from 'app/service/classe.service';
import { FiliereService } from 'app/service/filiere.service';
import Swal from 'sweetalert2';
import { AjoutModifierClasseComponent } from '../ajout-modifier-classe/ajout-modifier-classe.component';
import { ModifierclasseComponent } from '../modifierclasse/modifierclasse.component';

@Component({
  selector: 'app-detail-filiere',
  templateUrl: './detail-filiere.component.html',
  styleUrls: ['./detail-filiere.component.scss']
})
export class DetailFiliereComponent implements OnInit {

  filiere: Filiere;
  classes: Classe[]|any;
  constructor(private _dialog: MatDialog ,
    private classeService: ClasseService,
     private route: ActivatedRoute,
     private router: Router,
     private filiereService: FiliereService ) { 
      this.chargefiliere();
     }

  ngOnInit() {
    

    this.classeService.update$.subscribe(() => {
      this.chargefiliere();
    });
    
  }

  chargefiliere(){
    this.route.paramMap.subscribe(params => {
      const id = +params.get('id'); // Convertir l'ID en nombre
      this.filiereService.getOneFiliere(id).subscribe(filiere => this.filiere = filiere);
      this.loadClasses(id);
    });
  }

  onDelete(data: any){
    Swal.fire({
      title: 'Êtes-vous sûr de vouloir supprimer?',
      text: 'Vous ne pourriez plus récupérer cette classe !',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui, supprimez-le !',
      cancelButtonText: 'Non, garde-le'
    }).then((result) => {
      if (result.value) {
        this.classeService.triggerUpdate();
        
        this.classeService.supprimerClasse(data).subscribe();
        this.classeService.triggerUpdate();
       
        Swal.fire(
          'Supprimer!',
          'cette classe a été supprimer.',
          'success'
        )
        this.classeService.triggerUpdate();
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Annuler',
          'La classe est en sécurité ',
          'error'
        )
      }
    })
  }

  loadClasses(filiereId: number): void {
    this.classeService.getClassesByFiliere(filiereId).subscribe(
      (classes: any[]) => {
        this.classes = classes;
      },
      (error) => {
        console.error('Erreur lors du chargement des filières', error);
        // Gérer l'erreur selon vos besoins
      }
    );
  }
 

  OpenDialogAdd(data: Filiere, enterAnimationDuration: string, exitAnimationDuration: string){
    this._dialog.open(AjoutModifierClasseComponent,{
      data, enterAnimationDuration,
      exitAnimationDuration});
  }

  openEditForm(data: Classe, enterAnimationDuration: string, exitAnimationDuration: string) {

    const dialogRef = this._dialog.open(ModifierclasseComponent,  {
      data, enterAnimationDuration,
        exitAnimationDuration
    });
    
  }


}
