import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Admin } from 'app/model/admin';
import { Banque } from 'app/model/banque';
import { AdministrateurService } from 'app/service/administrateur.service';
import { BanqueService } from 'app/service/banque.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ajouter-banque',
  templateUrl: './ajouter-banque.component.html',
  styleUrls: ['./ajouter-banque.component.scss']
})
export class AjouterBanqueComponent implements OnInit {
  public imagePreview: string | ArrayBuffer | null = '../../../assets/img/preview.png';
   
  @ViewChild('imageInput') imageInput!: ElementRef<HTMLInputElement>;



    image!: File;
  
 
  bankForm! : FormGroup;
  admins !: Admin [] | any[];

  
 
  constructor(private route:Router, private fb : FormBuilder, private bankService: BanqueService, private adminService:AdministrateurService) { 
    this.bankForm = this.fb.group({
      nom:['', Validators.required],
      adresse:['', Validators.required],
      image: ['', Validators.required],
      admin: ['', Validators.required],
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

    if (this.image == null ) {
      Swal.fire({
        title: 'Erreur!',
        text: 'Une image est requise pour representer le logo la banque',
        icon: 'error',
        confirmButtonText: 'OK'
      })
      return

    }
    if(this.bankForm.valid && this.image){
      const newBank: Banque = this.bankForm.value;
      
      this.bankService.addBank(newBank, this.image).subscribe(
        (response) => {
          console.log('Banque ajoutée avec succès :', response);
          this.bankForm.reset();
          Swal.fire('Succès !...',  'Banque créer avec succes', 'success');
          this.route.navigate['/bank']

        },
        (error) => {
          console.error("Erreur lors de l'ajout de la banque :", error);
          // Gérer l'erreur ici
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error.error.message,
          });
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

