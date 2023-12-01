import {  OnInit } from '@angular/core';
import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Demande } from 'app/model/demande';
import { DemandeService } from 'app/service/demande.service';


@Component({
  selector: 'app-liste-demande-valide',
  templateUrl: './liste-demande-valide.component.html',
  styleUrls: ['./liste-demande-valide.component.scss']
})
export class ListeDemandeValideComponent  implements OnInit {
 
  demandes : Demande | any = [];


  constructor(private dialog:MatDialog, private demandeService: DemandeService) { }


  ngOnInit() : void{
    this.demandeService.getAllDemande().subscribe(
      (data) => {
        this.demandes = data.filter(demande => demande.statutDemande === "validé");
        console.log(this.demandes)
      },
      (error) => {
        console.error('Erreur lors du chargement de la liste des demandes validés:', error);
      }
    );
  }

}






