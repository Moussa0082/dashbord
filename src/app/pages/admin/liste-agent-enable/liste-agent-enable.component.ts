import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AjouterAgentComponent } from 'app/pages/ajouter-agent/ajouter-agent.component';
import { AgentService } from 'app/service/agent.service';
import { Agent } from 'http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-liste-agent-enable',
  templateUrl: './liste-agent-enable.component.html',
  styleUrls: ['./liste-agent-enable.component.scss']
})
export class ListeAgentEnableComponent implements OnInit {

  agents : Agent | any = [];

  constructor(private dialog:MatDialog, private agentService: AgentService) { }


  ngOnInit() : void{
    this.agentService.getAllAgent().subscribe(
      (data) => {
        this.agents = data.filter(agent => agent.isActive === true);
      },
      (error) => {
        console.error('Erreur lors du chargement de la liste des agents:', error);
      }
    );
  }



  openDialog() {
    const dialogRef = this.dialog.open(AjouterAgentComponent,{

    });
    }


    chargerDonner(){
      this.agentService.getAllAgent().subscribe(
        (data) => {
          this.agents = data.filter(agent => agent.isActive === true);
        },
        (error) => {
          console.error('Erreur lors du chargement de la liste des agents:', error);
        }
      );
    }

      // Exemple pour supprimer un administrateur
  onDesActivate(idAgent: number){
    Swal.fire({
      title: 'Êtes-vous sûr de vouloir desactiver cet agent?',
      text: 'Il ne pourra plus acceder à la plateforme !',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui, desactive-le !',
      cancelButtonText: 'Non, garde-le'
    }).then((result) => {
      if (result.value) {
        
        this.agentService.disableAgent(idAgent).subscribe();
         // Réalisez une action en cas de succès (rafraîchir la liste par exemple)
         this.agentService.triggerUpdate();
         this.chargerDonner();
         Swal.fire(
          'Desactivation!',
       'Cet agent a été desactivé.',
       'success'
     )
     this.agentService.triggerUpdate();
         this.chargerDonner();
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Annuler',
          'Desactivation annuler ',
          'error'
        )
      }
    })
  }

}
