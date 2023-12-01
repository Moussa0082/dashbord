import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Admin } from 'app/model/admin';
import { Banque } from 'app/model/banque';
import { AdministrateurService } from 'app/service/administrateur.service';
import { BanqueService } from 'app/service/banque.service';
import Swal from 'sweetalert2';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modifier-banque',
  templateUrl: './modifier-banque.component.html',
  styleUrls: ['./modifier-banque.component.scss']
})
export class ModifierBanqueComponent implements OnInit {
  public imagePreview: string | ArrayBuffer | null = '/assets/image/Rectangle 89.png';
   
  @ViewChild('imageInput') imageInput!: ElementRef<HTMLInputElement>;
  

  isEditMode = false;
  isFormVisible = false;
  admins !: Admin [] | any[];
  banques : Banque = new Banque();

  image!:File;  

  bankForm! : FormGroup;
  constructor(private fb : FormBuilder, private bankService: BanqueService, 
    private adminService:AdministrateurService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  private dialogRef: MatDialogRef<ModifierBanqueComponent>
    ) { 
    this.bankForm = this.fb.group({
      nom:[this.data.banque ? this.data.banque.nom : '', Validators.required],
      adresse:[this.data.banque ? this.data.banque.adresse : '', Validators.required],
      image: [this.data.banque ? this.data.banque.image : '', Validators.required],
      // admin: [this.data.banque ? this.data.banque.admin : '', Validators.required]
    });
  }

  ImageChange(event:any){
    this.image = event.target.files[0];
    console.log(this.image);
  }
  

  ngOnInit(): void {    
    this.adminService.getAdminList().subscribe(
      (data) => {
        this.admins = data.filter(admin => admin.isActive === true);
      },
      (error) => {
        console.error('Erreur lors du chargement de la liste des adminstrateurs:', error);
      }
    );
  }

  onSubmit() {
    // Obtenez l'ID à partir des données du dialogue
    const idBanque = this.data.banque?.idBanque;
    console.log("hh");
    if (this.bankForm.valid && this.image, idBanque) {
      const newBank = this.bankForm.value;
    console.log("aa");
      this.bankService.modifyBank(idBanque, newBank, this.image).subscribe(
        (response) => {
          console.log('Banque modifiée avec succès :', response);
          this.bankForm.reset();
          Swal.fire('Succès !...', 'Banque modifiée avec succès', 'success');
          // Fermez le dialogue ou effectuez d'autres actions nécessaires
          this.dialogRef.close(response);
        },
        (error) => {
          console.error("Erreur lors de la modification de la banque :", error);
          // Gérer l'erreur ici si nécessaire
        }
      );
    }
  }
  
      
    handleImageChange(event: Event): void {
      const input = event.target as HTMLInputElement;
      if (input.files && input.files.length) {
        const file = input.files[0];
        const reader = new FileReader();
        reader.onload = () => {
          this.imagePreview = reader.result;
        };
        reader.readAsDataURL(file);
      }
    }

  triggerImageUpload() {
    this.imageInput.nativeElement.click();
  }


}


