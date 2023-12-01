import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Filiere } from 'app/model/filiere.model';
import { FiliereService } from 'app/service/filiere.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modifierfiliere',
  templateUrl: './modifierfiliere.component.html',
  styleUrls: ['./modifierfiliere.component.scss']
})
export class ModifierfiliereComponent implements OnInit {
  filiereForm: FormGroup;
  // roleadmin: any[] = ["simple", "superadmin"];

  constructor(
    private _dialogRef: MatDialogRef<ModifierfiliereComponent>,
    private formBuilder: FormBuilder,
    private filiereService: FiliereService,
    @Inject(MAT_DIALOG_DATA) public data: Filiere |any
  ) {
    this.filiereForm = this.formBuilder.group({
      idFiliere: this.data.idFiliere, // Si c'est une modification, initialisez avec l'ID existant
      niveau:  this.data.niveau, 
      nom: this.data.nom 
      
    });
  }
  ngOnInit(): void {
  }

  onSubmit() {
    if (this.filiereForm.valid) {
      const data = this.filiereForm.value;
      if (this.data) {
        // Update
        this.filiereService.modifierFiliere(data).subscribe(
          (response) => {
            this.filiereForm.reset();
            this._dialogRef.close(true);
            this.filiereService.triggerUpdate();
            Swal.fire('Merci !...', 'Filiere modifier avec succes', 'success');
            
          },
          (error) => {
            Swal.fire('Erreur !...', error.error.message, 'error');
          }
        );
        this.filiereService.triggerUpdate();
        // this._dialogRef.close(true);
        
      } 

    }

  }

}
