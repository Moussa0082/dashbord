import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Classe } from 'app/model/classe.model';
import { ClasseService } from 'app/service/classe.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modifierclasse',
  templateUrl: './modifierclasse.component.html',
  styleUrls: ['./modifierclasse.component.scss']
})
export class ModifierclasseComponent implements OnInit {

  classeForm: FormGroup;
  // roleadmin: any[] = ["simple", "superadmin"];

  constructor(
    private _dialogRef: MatDialogRef<ModifierclasseComponent>,
    private formBuilder: FormBuilder,
    private classeService: ClasseService,
    @Inject(MAT_DIALOG_DATA) public data: Classe |any
  ) {
    this.classeForm = this.formBuilder.group({
      idClasse: this.data.idClasse, // Si c'est une modification, initialisez avec l'ID existant
      filiere:  this.data.filiere, 
      nom: this.data.nom, 
      montant: this.data.montant,  
      
    });
  }
  ngOnInit(): void {
  }

  onSubmit() {
    if (this.classeForm.valid) {
      const data = this.classeForm.value;
      if (this.data) {
        // Update
        this.classeService.modifierClasse(data).subscribe(
          (response) => {
            this.classeForm.reset();
            this._dialogRef.close(true);
            this.classeService.triggerUpdate();

            Swal.fire('Merci !...', 'classe modifier avec succes', 'success');
            
          },
          (error) => {
            Swal.fire('Erreur !...', error.error.message, 'error');
          }
        );
        this.classeService.triggerUpdate();

        // this._dialogRef.close(true);
        
      } 

    }

  }


}
