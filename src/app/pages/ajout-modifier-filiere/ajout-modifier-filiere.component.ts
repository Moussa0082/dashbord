import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Niveaux } from 'app/model/niveaux';
import { NiveauService } from 'app/service/niveau.service';
import Swal from 'sweetalert2';
import { AjoutModifierAdminComponent } from '../ajout-modifier-admin/ajout-modifier-admin.component';
import { FiliereService } from 'app/service/filiere.service';
import { Filiere } from 'app/model/filiere.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-ajout-modifier-filiere',
  templateUrl: './ajout-modifier-filiere.component.html',
  styleUrls: ['./ajout-modifier-filiere.component.scss']
})
export class AjoutModifierFiliereComponent implements OnInit {
  filiereForm: FormGroup;
  // roleadmin: any[] = ["simple", "superadmin"];

  constructor(
    private _dialogRef: MatDialogRef<AjoutModifierAdminComponent>,
    private formBuilder: FormBuilder,
    private _dialog: MatDialog,
    private filiereService: FiliereService,
    @Inject(MAT_DIALOG_DATA) public data: Niveaux | any
  ) {
    this.filiereForm = this.formBuilder.group({
       // Si c'est une modification, initialisez avec l'ID existant
       idFiliere:'',
      nom: ['', Validators.required],
      niveau: this.data
    });
  }
  ngOnInit(): void {
    console.log(" data :", this.data);
    console.log(" data valeur :", this.data.value);
  }

  onSubmit() {
    if (this.filiereForm.valid) {
      const data = this.filiereForm.value;
      
        // Create
       
        this.filiereService.ajouterFiliere(data).subscribe(
          (response) => {
            console.log('filiere enregistré avec succès:', response);
            this.filiereForm.reset();
            this.filiereService.triggerUpdate();
            this._dialogRef.close(true);
            Swal.fire('Merci !...', 'filiere enregistré avec succès!', 'success');
          },
          (error) => {
            console.error('Erreur lors de l\'ajout de filiere:', error);
          }
        );
        this._dialogRef.close(true);
        this.filiereService.triggerUpdate();
    }
  }
}
