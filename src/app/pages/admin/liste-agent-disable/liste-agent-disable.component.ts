import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AgentService } from 'app/service/agent.service';
import { Agent } from 'http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-liste-agent-disable',
  templateUrl: './liste-agent-disable.component.html',
  styleUrls: ['./liste-agent-disable.component.scss']
})
export class ListeAgentDisableComponent implements OnInit {
  agents : Agent | any = [];

  constructor(private dialog:MatDialog, private agentService: AgentService) { }


  ngOnInit() : void{
    this.agentService.getAllAgent().subscribe(
      (data) => {
        this.agents = data.filter(agent => agent.isActive === false);
      },
      (error) => {
        console.error('Erreur lors du chargement de la liste des agents:', error);
      }
    );
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

    // Exemple pour activer un agent
    onActivate(idAgent: number){
  Swal.fire({
    title: "Êtes-vous sûr de vouloir d'activer cet agent?",
    text: 'Il  pourra  acceder à la plateforme !',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: "Oui, l'active !",
    cancelButtonText: 'Non, garder son compte inactive'
  }).then((result) => {
    if (result.value) {
      
      this.agentService.enableAgent(idAgent).subscribe();
       // Réalisez une action en cas de succès (rafraîchir la liste par exemple)
       this.agentService.triggerUpdate();
       this.chargerDonner();
       Swal.fire(
        'Activation!',
     'Cet agent a été activé.',
     'success'
   )
   this.agentService.triggerUpdate();
       this.chargerDonner();
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      Swal.fire(
        'Annuler',
        'Activation annuler ',
        'error'
      )
    }
  })
}

}
