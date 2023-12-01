import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Agent } from 'app/model/agent';
import { DemandeService } from 'app/service/demande.service';

@Component({
  selector: 'app-assign-agent',
  templateUrl: './assign-agent.component.html',
  styleUrls: ['./assign-agent.component.scss']
})
export class AssignAgentComponent implements OnInit {

  selectedAgentId:number;
  assignForm : FormGroup;
  idDemande: number;
  agents : Agent | any = [];

  constructor(private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AssignAgentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private demandeService: DemandeService
  ) {
    this.idDemande = data.demandeId;
    this.assignForm = this.formBuilder.group({
      selectedAgentId: ['', Validators.required]
    });
  }

  onAgentSelected(event: any) {
    this.selectedAgentId = event.target.value;
  }

  assignDemande(idAgent:number): void {
    if (this.assignForm.valid) {

      let selectedAgentId = this.assignForm.value;
      // let selectedAgentId = this.assignForm.value.selectedAgentId;
      
      this.demandeService.assignDemandeToAgent(this.idDemande, idAgent).subscribe(
        result => {
          console.log('demandeId:', this.idDemande);
          console.log('selectedAgentId:', selectedAgentId);
            console.log(result);
            // Fermez le dialogue ou effectuez d'autres actions nécessaires.
            this.dialogRef.close();
          },
          error => {
            console.error('Erreur lors de l\'attribution de la demande à l\'agent', error);
            // Fermez le dialogue en cas d'erreur si nécessaire.
            this.dialogRef.close();
          });
      
    }
  }
  
  ngOnInit(): void {
    this.demandeService.getAgents().subscribe(agents => {
      this.agents = agents;
    });
  }

}
