import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Banque } from 'app/model/banque';
import { AgentService } from 'app/service/agent.service';
import { BanqueService } from 'app/service/banque.service';
import Swal from 'sweetalert2';

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

  image!:File;
     
    ImageChange(event:any){
      this.image = event.target.files[0];
      console.log(this.image);
    }
 

  // @Output() formSubmitted = new EventEmitter<void>()


  //  selectedFile: File | null = null;
  
  banques: Banque | any  = [];

  agentForm! : FormGroup;
  constructor(private bankService:BanqueService,private formBuilder: FormBuilder, private route:Router,private agentService:AgentService) { 

    this.agentForm = this.formBuilder.group({
   
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', Validators.required],
      motDePasse: ['', Validators.required],
      image: ['', Validators.required],
      banque:['', Validators.required]
    });
  }

  

  ngOnInit(): void { 
    
    this.bankService.getAllBanque().subscribe(
      (data) => {
        this.banques = data;
        console.log(this.banques.length);
        console.log(this.banques);
      },
      (error) => {
        console.error('Erreur lors du chargement de la liste des banques:', error);
      }
    );
   
  }

  onSubmit() {
  console.log("salut")
    if (this.image == null ) {
      Swal.fire({
        title: 'Erreur!',
        text: 'Une image est requise',
        icon: 'error',
        confirmButtonText: 'OK'
      })
      return

    }
   
    
      
    if (this.agentForm.valid && this.image) {
      console.log('valid')
     const newAgent = this.agentForm.value;
     console.log(this.agentForm.value);
     console.log(newAgent);
        
    this.agentService.createAgent(newAgent, this.image).subscribe(
      (response) => {
        console.log("Agent crée", response);
        this.agentForm.reset();
        // this.chargerData();
        Swal.fire('Succès !...', 'Agent créer avec succes', 'success');
        this.route.navigate['/enable-agents']
    },
    (error) => {
      console.error("Erreur", error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.error.message,
      });
    });
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




