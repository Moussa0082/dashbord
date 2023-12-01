import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Banque } from 'app/model/banque';
import { BanqueService } from 'app/service/banque.service';
import { TypeBanqueService } from 'app/service/type-banque.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modifier-type-banque',
  templateUrl: './modifier-type-banque.component.html',
  styleUrls: ['./modifier-type-banque.component.scss']
})
export class ModifierTypeBanqueComponent implements OnInit {

  public imagePreview: string | ArrayBuffer | null = '/assets/image/Rectangle 89.png';
   
  @ViewChild('imageInput') imageInput!: ElementRef<HTMLInputElement>;
  

  image!:File;  
  typeBankForm! : FormGroup;
  bank: Banque  | any  = [];

  constructor(
    private fb : FormBuilder,
    private typeBanque : TypeBanqueService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private typeBanqueService:TypeBanqueService,
    private bankService: BanqueService,
    private dialogRef: MatDialogRef<ModifierTypeBanqueComponent>
  ) {
    this.typeBankForm = this.fb.group({
      nom:[this.data.typeBanque ? this.data.typeBanque.nom : '', Validators.required],
      description:[this.data.typeBanque ? this.data.typeBanque.description : '', Validators.required],
      image: [this.data.typeBanque ? this.data.typeBanque.image : '', Validators.required],
      banque: [this.data.typeBanque ? this.data.typeBanque.banque : '', Validators.required]
    });
   }


   onSubmit() {
    // Obtenez l'ID à partir des données du dialogue
    const idTypeBanque = this.data.typeBanque?.idTypeBanque;
    console.log("hh");
    if (this.typeBankForm.valid && this.image, idTypeBanque) {
      const newTypeBank = this.typeBankForm.value;
    console.log("aa");
      this.typeBanqueService.modifierTypeBanque(idTypeBanque, newTypeBank, this.image).subscribe(
        (response) => {
          console.log('Type Banque modifiée avec succès :', response);
          this.typeBankForm.reset();
          Swal.fire('Succès !...', 'Type Banque modifiée avec succès', 'success');
          // Fermez le dialogue ou effectuez d'autres actions nécessaires
          this.dialogRef.close(response);
        },
        (error) => {
          console.error("Erreur lors de la modification du type de la banque :", error);
          // Gérer l'erreur ici si nécessaire
        }
      );
    }
  }

   ImageChange(event:any){
    this.image = event.target.files[0];
    console.log(this.image);
  }

  ngOnInit(): void {

    this.bankService.getAllBanque().subscribe(
      (data) => {
        this.bank = data;
      },
      (error) => {
        console.error('Erreur lors du chargement de la liste des types banques:', error);
      }
    );

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
