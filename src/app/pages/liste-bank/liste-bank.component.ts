import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { ModifierBanqueComponent } from '../modifier-banque/modifier-banque.component';
import { BanqueService } from 'app/service/banque.service';
import { Banque } from 'app/model/banque';
import { AjouterBanqueComponent } from '../ajouter-banque/ajouter-banque.component';

@Component({
  selector: 'app-liste-bank',
  templateUrl: './liste-bank.component.html',
  styleUrls: ['./liste-bank.component.scss']
})
export class ListeBankComponent implements OnInit {
  
  banques: Banque | any  = [];
 
  constructor(private dialog:MatDialog, private bankService: BanqueService) { }


  ngOnInit() : void{
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

  chargerDonner(): void {
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
 
  
  openDialog() {
    const dialogRef = this.dialog.open(AjouterBanqueComponent,{
      // width: '650px',
      // height:'570px',
    });
    }

    // openModifierDialog(id: number) {
    //   const banqueToModify = this.banques.find(banque => banque.id === id);
    
    //   const dialogRef = this.dialog.open(ModifierBanqueComponent, {
    //     data: { banque: { ...banqueToModify } }
    //   });
    
    //   dialogRef.afterClosed().subscribe(modifiedBanque => {
    //     if (modifiedBanque) {
    //       // Si besoin, vous pouvez effectuer des opérations avec les données modifiées ici
    //       this.bankService.modifyBank(id, modifiedBanque).subscribe(result => {
    //         console.log(result);
    //       });
    //     }
    //   });
    // }

    openModifierDialog(banque:Banque): void {
      const dialogRef = this.dialog.open(ModifierBanqueComponent, {
        data: { "banque" : banque }
      });
    
      dialogRef.afterClosed().subscribe((result) => {
        // Effectuez des actions nécessaires après la fermeture du dialogue
        console.log('Dialogue fermé avec résultat :', result);
      });
    }

    

    

  onDelete(id:number):void{
    console.log("supprimer");
    Swal.fire({
      title: "Etes vous supprimer?",
      text: "Voulez - vous supprimer!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText:"Non",
      confirmButtonText: "Oui, je veux supprimer!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.bankService.deleteBank(id).subscribe(
          (result) => {
            console.log(result);
          }
        );
        this.chargerDonner();
        console.log("idBanque", id);
        Swal.fire({
          title: "Supprimer!",
          text: "Suppression réussi.",
          icon: "success"
        });
      }else{
        Swal.fire(
          'Suppression annulée!',
          'Cette suppresion a été annulée.',
          'error'
        )
      }
    });
  }

}
