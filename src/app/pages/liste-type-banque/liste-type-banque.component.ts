import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { AjouterTypeBanqueComponent } from '../ajouter-type-banque/ajouter-type-banque.component';
import { TypeBanqueService } from 'app/service/type-banque.service';
import { TypeBanque } from 'app/model/type-banque';
import { BanqueService } from 'app/service/banque.service';
import { Banque } from 'app/model/banque';
import { ModifierTypeBanqueComponent } from '../modifier-type-banque/modifier-type-banque.component';

@Component({
  selector: 'app-liste-type-banque',
  templateUrl: './liste-type-banque.component.html',
  styleUrls: ['./liste-type-banque.component.scss']
})
export class ListeTypeBanqueComponent implements OnInit {

  typeBanques: TypeBanque  | any  = [];

  isModification : boolean = false;

  // selectedBanque: Banque | undefined;


  constructor(private dialog:MatDialog, private typeBankService: TypeBanqueService, private bankService:BanqueService) { 
 
     this.chargerData();

  }


  ngOnInit() : void{
    this.typeBankService.update$.subscribe(() => {
        this.chargerData();
      });
  }
  chargerData() : void{
    this.typeBankService.getAllTypeBanque().subscribe(
      (data) => {
        this.typeBanques = data;
        console.log(this.typeBanques.length);
        console.log(this.typeBanques);
      },
      (error) => {
        console.error('Erreur lors du chargement de la liste des types banques:', error);
      }
    );
  }

 

  openDialog() {
    
    const dialogRef = this.dialog.open(AjouterTypeBanqueComponent, {
      // width: '650px',
      // height: '570px',
    });
    }

    openModifierDialog(typeBanque:TypeBanque): void {
      const dialogRef = this.dialog.open(ModifierTypeBanqueComponent, {
        data: { "typeBanque" : typeBanque , "selectedBanque": Banque}
      });
    
      dialogRef.afterClosed().subscribe((result) => {
        // Effectuez des actions nécessaires après la fermeture du dialogue
        console.log('Dialogue fermé avec résultat :', result);
      });
    }

    delete(id:number){
    Swal.fire({
      title: 'Etes vous sûr ?',
      text: "Voulez - vous supprimer!!",
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText:'Annuler',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, je veux supprimer!',
    }).then((result) => {
      if (result.value) {
        this.typeBankService.deleteTypeBank(id).subscribe(
      (result) => {
        console.log(result);
      }
          );
          console.log("id type banque ", id);
        this.chargerData();
        Swal.fire(
          'Supprimer!',
          'Suppression avec succès.',
          'success'
          )
        }
      else{
        Swal.fire(
          'Suppression annulée!',
          'Cette suppresion a été annulée.',
          'error'
        )
      }
    });
    this.chargerData();

  }

}
