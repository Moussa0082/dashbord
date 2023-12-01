import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Admin } from 'app/model/admin';
import { Banque } from 'app/model/banque';
import { AdministrateurService } from 'app/service/administrateur.service';
import { BanqueService } from 'app/service/banque.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ajoute-admin',
  templateUrl: './ajoute-admin.component.html',
  styleUrls: ['./ajoute-admin.component.scss']
})
export class AjouteAdminComponent implements OnInit {

  public imagePreview: string | ArrayBuffer | null = '../../../assets/img/preview.png';
   
  @ViewChild('imageInput') imageInput!: ElementRef<HTMLInputElement>;
  

  isEditMode = false;
  isFormVisible = false;



  // @Output() formSubmitted = new EventEmitter<void>()


  bank: Banque  | any  = [];
  image!: File;

  adminForm! : FormGroup;
  constructor(private formBuilder: FormBuilder, private adminService:AdministrateurService, private bankService:BanqueService) { 

    this.adminForm = this.formBuilder.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', Validators.required],
      image: ['', Validators.required],
      motDePasse: ['', Validators.required],
      banque:['', Validators.required]
    });
  }

  

  ngOnInit(): void {    

    this.bankService.getAllBanque().subscribe(
      (data) => {
        this.bank = data;
      },
      (error) => {
        console.error('Erreur lors du chargement de la liste des banques:', error);
      }
    );
   
  }

  ImageChange(event:any){
    this.image = event.target.files[0];
    console.log(this.image);
  }

  onSubmit() {

    if(this.adminForm.valid && this.image){
      const newAdmin: Admin = this.adminForm.value;
      
      this.adminService.addAdmin(newAdmin, this.image).subscribe(
        (response) => {
          console.log('Admin ajoutée avec succès :', response);
          this.adminForm.reset();
          Swal.fire('Succès !...',  'Admin créer avec succes', 'success');
        },
        (error) => {
          console.error("Erreur lors de l'ajout de l'admin :", error);
          // Gérer l'erreur ici
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
