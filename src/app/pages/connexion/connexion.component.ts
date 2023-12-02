import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Admin } from 'app/model/admin';
import { AdministrateurService } from 'app/service/administrateur.service';
import { AuthentificationService } from 'app/service/authentification.service';
import Swal from 'sweetalert2';
import { error } from 'console';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.scss']
})
export class ConnexionComponent implements OnInit {
  loginForm!: FormGroup;
  // admin:any;


  constructor(private authService: AuthentificationService, private router: Router, private formBuilder: FormBuilder) { 
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      motDePasse: ['', Validators.required],
      userType: ['', Validators.required],
    });
  }

  ngOnInit() {
  
  }

  // onSubmit() {
  //   // console.log("oui")
  //   // console.log(this.loginForm.value)
  //   const  { email, motDePasse, userType } = this.loginForm.value;
  //   if (this.loginForm.valid) {
  //     this.authService.login(email, motDePasse, userType).subscribe(
  //       (response: any) => {
  //         // Gérer la connexion réussie ici
  //         console.log(response.data);
  //         this.router.navigate(['/tableaudebord']);
  //         Swal.fire('Succès !...',  'Connexion réussi avec succes', 'success');
  //         this.loginForm.reset();
  //       },
  //       (error: any) => {
  //         // this.snack.openSnackBar("Mot de passe ou nom incorrect");
  //         console.error("erreur", error);
  //         Swal.fire({
  //                     icon: 'error',
  //                     title: 'Oops...',
  //                     text: error.error.message,
  //                }
  //         )
  //       }
  //     );
  //   }
  // }
  // login.component.ts
  // login.component.ts


  onSubmit() {
    const { email, motDePasse, userType } = this.loginForm.value;
  
    if (this.loginForm.valid) {
      this.authService.login(email, motDePasse, userType).subscribe(
        (response: any) => {
          // Gérer la connexion réussie ici
          console.log(response, userType);
          // Stocker les informations de l'utilisateur dans localStorage
          localStorage.setItem('userData', JSON.stringify({
            userData: response,
            userType, // Assurez-vous que la structure de votre réponse est correcte
          }));
  
          console.log("userType", localStorage.getItem('userData'));
          // Rediriger vers la page appropriée
          switch (userType) {
            case "Admin":
              this.router.navigate(['/adminTablau']);
              break;
            case "Agent":
              this.router.navigate(['/agentTablau']);
              break;
            default:
              this.router.navigate(['/tableaudebord']);
              break;
          }
  
          Swal.fire('Succès !...', 'Connexion réussie avec succès', 'success');
          this.loginForm.reset();
        },
        (error: any) => {
          console.error("Erreur lors de la connexion :", error);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error.error.message,
          });
        }
      );
    }
  }

//  onSubmit() {
//   const { email, motDePasse , userType} = this.loginForm.value;

//   if (this.loginForm.valid) {
//     this.authService.login(email, motDePasse , userType).subscribe(
//       (response: any) => {
//         // Gérer la connexion réussie ici
//         console.log(response, userType);
//       // Stocker les informations de l'utilisateur dans localStorage
//       localStorage.setItem('userData', JSON.stringify({
       
//         userData: response,  userType, // Assurez-vous que la structure de votre réponse est correcte
//       }));

//       console.log("userType", localStorage.getItem('userData'));
        
//         // Rediriger vers le tableau de bord
//         this.router.navigate(['/tableaudebord']);

//         Swal.fire('Succès !...',  'Connexion réussie avec succès', 'success');
//         this.loginForm.reset();
//       },
//       (error: any) => {
//         console.error("Erreur lors de la connexion :", error);
//         Swal.fire({
//           icon: 'error',
//           title: 'Oops...',
//           text: error.error.message,
//         });
//       }
//     );
//   }
// }


// onSubmit() {
//   const { email, motDePasse, userType } = this.loginForm.value;
//   if (this.loginForm.valid) {
//     this.authService.login(email, motDePasse, userType).subscribe(
//       (user: any) => {
//         console.log('Utilisateur connecté :', user);

//         // Gérer les informations de l'utilisateur en fonction du type
//         if (userType === 'Admin') {
//           // Opérations spécifiques pour un administrateur
//           console.log('C\'est un administrateur');
//         } else if (userType === 'SuperAdmin') {
//           // Opérations spécifiques pour un super administrateur
//           console.log('C\'est un super administrateur');
//         } else if (userType === 'Agent') {
//           // Opérations spécifiques pour un agent
//           console.log('C\'est un agent');
//         } else {
//           console.log('Type d\'utilisateur non pris en charge');
//         }

//         // Redirection en fonction du type d'utilisateur
//         this.redirectUser(userType);

//         Swal.fire('Succès !...', 'Connexion réussie avec succès', 'success');
//         this.loginForm.reset();
//       },
//       (error: any) => {
//         console.error('Erreur lors de la connexion :', error);
//         Swal.fire({
//           icon: 'error',
//           title: 'Oops...',
//           text: error.error.message,
//         });
//       }
//     );
//   }
// }

// Méthode pour rediriger en fonction du type d'utilisateur
redirectUser(userType: string): void {
  switch (userType) {
    case 'Admin':
      this.router.navigate(['/admin-dashboard']);
      break;
    case 'SuperAdmin':
      this.router.navigate(['/superadmin-dashboard']);
      break;
    case 'Agent':
      this.router.navigate(['/agent-dashboard']);
      break;
    default:
      console.log('Type d\'utilisateur non pris en charge pour la redirection');
  }
}

 

  // onSubmit() {
  //   if (this.loginForm.valid) {
  //     const { email, motDePasse } = this.loginForm.value;
  //     this.adminService.loginAdmin(email, motDePasse).subscribe(
  //       (response: any) => {
  //         const IdAdmincon = response.idAdministrateur;
  //         localStorage.setItem('idAdministrateur', IdAdmincon);
  //         this.autService.setAdminConnect(response);
  //         // Gérer la connexion réussie ici
  //         this.autService.triggerUpdate()
  //         this.router.navigate(['/tableaudebord']);
          
  //       },
  //       (error) => {

  //         Swal.fire({
  //           icon: 'error',
  //           title: 'Oops...',
  //           text: "Email ou mot de passe invalide !",

  //           // footer: '<a href>Why do I have this issue?</a>'
  //         })
  //       }
  //     );


  //   }
  // }

}
