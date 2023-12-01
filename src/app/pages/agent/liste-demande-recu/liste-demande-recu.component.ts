import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AssignAgentComponent } from 'app/pages/admin/assign-agent/assign-agent.component';
import { Demande } from 'app/model/demande';
import { DemandeService } from 'app/service/demande.service';

@Component({
  selector: 'app-liste-demande-recu',
  templateUrl: './liste-demande-recu.component.html',
  styleUrls: ['./liste-demande-recu.component.scss']
})
export class ListeDemandeRecuComponent implements OnInit {

  demandes : Demande | any = [];
  agents: any[] = [];

 
  constructor(private dialog:MatDialog, private demandeService: DemandeService) { }


  ngOnInit() : void{
    this.demandeService.getAllDemande().subscribe(
      (data) => {
        this.demandes = data.filter(demande => demande.statutDemande === "reçu");
        console.log(this.demandes)
      },
      (error) => {
        console.error('Erreur lors du chargement de la liste des demandes reçu:', error);
      }
    );
    this.demandeService.getAgents().subscribe(agents => {
      this.agents = agents;
    });
  }

  openDialog(demandeId: number): void {
    const dialogRef = this.dialog.open(AssignAgentComponent, {
      data: { agents: this.agents, demandeId: demandeId }
    });
  
    dialogRef.afterClosed().subscribe(selectedAgentId => {
      if (selectedAgentId) {
        this.demandeService.assignDemandeToAgent(demandeId, selectedAgentId).subscribe(result => {
          console.log(result);
        });
      }
    });
  }
}
