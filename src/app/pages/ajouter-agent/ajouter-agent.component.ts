import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-ajouter-agent',
  templateUrl: './ajouter-agent.component.html',
  styleUrls: ['./ajouter-agent.component.scss']
})
export class AjouterAgentComponent implements OnInit {
  public imagePreview: string | ArrayBuffer | null = '../../../assets/img/preview.png';
   
  @ViewChild('imageInput') imageInput!: ElementRef<HTMLInputElement>;
  

  isEditMode = false;
  isFormVisible = false;



  // @Output() formSubmitted = new EventEmitter<void>()


  //  selectedFile: File | null = null;
  

  agentForm! : FormGroup;
  constructor(private formBuilder: FormBuilder) { 

    // this.medecinForm = this.formBuilder.group({
    //   id:['null'],
    //   nom: ['', Validators.required],
    //   prenom: ['', Validators.required],
    //   email: ['', Validators.required],
    //   telephone: ['', Validators.required],
    //   specialite: ['', Validators.required],
    //   image: ['']
    // });
  }

  

  ngOnInit(): void {    
   
  }

  onSubmit() {

    if (this.agentForm.valid) {
    //   const newMedecin = this.medecinForm.value as Medecin;
    //   this.medecinService.ajoutMedecin(newMedecin);
    //   this.medecinService.getMedecin();
    //   console.warn(newMedecin)
    //   Swal.fire(
    //     'Ajouter avec succès!',
    //     'Les données sont enrégistrés avec succès!',
    //     'success'
    //   )
    //   this.medecinForm.reset();
       
    // }
  }
       

        // toggleFormWithDelay() {
        //   setTimeout(() => {
        //     this.isFormVisible = !this.isFormVisible;
        //   }, 1000);// Delay of 1 second
        // }
      // toggleForm(isEditMode: boolean) {
      //   this.isFormVisible = true;
      //   this.isEditMode = isEditMode;
      // }
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




