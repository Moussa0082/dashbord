import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Filiere } from 'app/model/filiere.model';
import { ClasseService } from 'app/service/classe.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ajout-modifier-classe',
  templateUrl: './ajout-modifier-classe.component.html',
  styleUrls: ['./ajout-modifier-classe.component.scss']
})
export class AjoutModifierClasseComponent implements OnInit {

  classeForm: FormGroup;
  // roleadmin: any[] = ["simple", "superadmin"];

  constructor(
    private _dialogRef: MatDialogRef<AjoutModifierClasseComponent>,
    private formBuilder: FormBuilder,
    private _dialog: MatDialog,
    private classeService: ClasseService,
    @Inject(MAT_DIALOG_DATA) public data: Filiere | any
  ) {
    this.classeForm = this.formBuilder.group({
       // Si c'est une modification, initialisez avec l'ID existant
       idClasse:'',
      nom: ['', Validators.required],
      montant: [ , Validators.required],
      filiere: this.data
    });
  }
  ngOnInit(): void {
  
  }

  onSubmit() {
    if (this.classeForm.valid) {
      const data = this.classeForm.value;
      
        // Create
       
        this.classeService.ajouterClasse(data).subscribe(
          (response) => {
            console.log('classe enregistré avec succès:', response);
            this.classeForm.reset();
            this.classeService.triggerUpdate();
            this._dialogRef.close(true);
            Swal.fire('Merci !...', 'classe enregistré avec succès!', 'success');
            this.classeService.triggerUpdate();
          },
          (error) => {
            console.error('Erreur lors de l\'ajout de classe:', error);
          }
        );
        this._dialogRef.close(true);
        this.classeService.triggerUpdate();
    }
  }

}
