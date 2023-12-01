import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Admin } from 'app/model/admin';
import { AdministrateurService } from 'app/service/administrateur.service';
import { AuthentificationService } from 'app/service/authentification.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ajout-modifier-admin',
  templateUrl: './ajout-modifier-admin.component.html',
  styleUrls: ['./ajout-modifier-admin.component.scss']
})
export class AjoutModifierAdminComponent implements OnInit {
  adminForm: FormGroup;
  roleadmin: any[] = ["simple", "superadmin"];

  constructor(
    private _dialogRef: MatDialogRef<AjoutModifierAdminComponent>,
    private formBuilder: FormBuilder,
    private _dialog: MatDialog,
    private adminService: AdministrateurService,private authService: AuthentificationService,
    @Inject(MAT_DIALOG_DATA) public data: Admin | any
  ) {
    this.adminForm = this.formBuilder.group({
      idAdministrateur: this.data ? this.data.idAdministrateur : '', // Si c'est une modification, initialisez avec l'ID existant
      nom: [this.data ? this.data.nom : '', Validators.required],
      prenom: [this.data ? this.data.prenom : '', Validators.required],
      email: [this.data ? this.data.email : '', Validators.required],
      motDePasse: [this.data ? this.data.motDePasse : '', Validators.required],
      role: [this.data ? this.data.role : '', Validators.required]
    });
  }
  ngOnInit(): void {
    this.adminForm.patchValue(this.data);
  }

  onSubmit() {
    if (this.adminForm.valid) {
      const data = this.adminForm.value;
      if (this.data) {
        // Update
        this.adminService.modifyAdmin(data).subscribe(
          (response) => {
            this.adminForm.reset();
            this.authService.setAdminConnect(data);
            this._dialogRef.close(true);
            this.authService.triggerUpdate();
          
            Swal.fire('Merci !...', 'Admin modifié avec succès!', 'success');
          },
          (error) => {
            console.error('Erreur lors de la modification de l\'administrateur:', error);
          }
        );
       
      } else {
        // Create
       
        this.adminService.addAdmin(data).subscribe(
          (response) => {
            console.log('Admin enregistré avec succès:', response);
            this.adminForm.reset();
            this._dialogRef.close(true);
            Swal.fire('Merci !...', 'Admin enregistré avec succès!', 'success');
            this.adminService.triggerUpdate();
            this.authService.triggerUpdate();
          },
          (error) => {
            console.error('Erreur lors de l\'ajout de l\'administrateur:', error);
          }
        );
      
      }
    }
  }
  
}
