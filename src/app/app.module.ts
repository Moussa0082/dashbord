import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table'
import { MatInputModule } from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { RouterModule } from '@angular/router';
import {MatPaginatorModule } from '@angular/material/paginator'; 
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { EnseignantComponent } from './pages/enseignant/enseignant.component';
import { EtudiantComponent } from './pages/etudiant/etudiant.component';
import { ConnexionComponent } from './pages/connexion/connexion.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { AlertEnseignantComponent } from './pages/alert-enseignant/alert-enseignant.component';
import { TableauDeBordComponent } from './pages/tableau-de-bord/tableau-de-bord.component';
import { AjoutModifierAdminComponent } from './pages/ajout-modifier-admin/ajout-modifier-admin.component';
import { AjoutModifierNiveauComponent } from './pages/ajout-modifier-niveau/ajout-modifier-niveau.component';
import { AjoutModifierFiliereComponent } from './pages/ajout-modifier-filiere/ajout-modifier-filiere.component';
import { AjoutModifierClasseComponent } from './pages/ajout-modifier-classe/ajout-modifier-classe.component';
import { MatDialogModule} from '@angular/material/dialog';
import { AdministrateurComponent } from './pages/administrateur/administrateur.component';
import { HttpClientModule } from '@angular/common/http';
import { DetailNiveauComponent } from './pages/detail-niveau/detail-niveau.component';
import { DetailFiliereComponent } from './pages/detail-filiere/detail-filiere.component';
import { ImageDetailComponent } from './pages/image-detail/image-detail.component';
import { FourOhFourComponent } from './four-oh-four/four-oh-four.component';
import { ModifierfiliereComponent } from './pages/modifierfiliere/modifierfiliere.component';
import { ModifierclasseComponent } from './pages/modifierclasse/modifierclasse.component';
import { AbonnementComponent } from './pages/abonnement/abonnement.component';
import { ListeDemandeAnnuleComponent } from './pages/agent/liste-demande-annule/liste-demande-annule.component';
import { ListeDemandeValideComponent } from './pages/agent/liste-demande-valide/liste-demande-valide.component';
import { ListeDemandeRejeteComponent } from './pages/agent/liste-demande-rejete/liste-demande-rejete.component';
import { ListeDemandeRecuComponent } from './pages/agent/liste-demande-recu/liste-demande-recu.component';
import { ListeDemandeEnCoursComponent } from './pages/agent/liste-demande-en-cours/liste-demande-en-cours.component';
import { ListeAgentDisableComponent } from './pages/admin/liste-agent-disable/liste-agent-disable.component';
import { ListeAgentEnableComponent } from './pages/admin/liste-agent-enable/liste-agent-enable.component';
import { ListeGroupCotisationComponent } from './pages/liste-group-cotisation/liste-group-cotisation.component';
import { ListeBankComponent } from './pages/liste-bank/liste-bank.component';
import { ListeAdminComponent } from './pages/liste-admin/liste-admin.component';
import { ListeTypeBanqueComponent } from './pages/liste-type-banque/liste-type-banque.component';
import { DetailDemandeComponent } from './pages/agent/detail-demande/detail-demande.component';
import { AssignAgentComponent } from './pages/admin/assign-agent/assign-agent.component';
import { AjouteAdminComponent } from './pages/ajoute-admin/ajoute-admin.component';
import { AjouterAgentComponent } from './pages/ajouter-agent/ajouter-agent.component';
import { AjouterBanqueComponent } from './pages/ajouter-banque/ajouter-banque.component';
import { AjouterTypeBanqueComponent } from './pages/ajouter-type-banque/ajouter-type-banque.component';
import { ModifierBanqueComponent } from './pages/modifier-banque/modifier-banque.component';
import { ModifierTypeBanqueComponent } from './pages/modifier-type-banque/modifier-type-banque.component';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    MatSelectModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComponentsModule,
    MatDialogModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatInputModule,
    RouterModule,
    MatTableModule,
    AppRoutingModule,
    // AppRoutingModule
  ],
  declarations: [
    AppComponent,
    AdministrateurComponent,
    AdminLayoutComponent,
    EnseignantComponent,
    EtudiantComponent,
    ConnexionComponent,
    ProfileComponent,
    AlertEnseignantComponent,
    TableauDeBordComponent,
    AjoutModifierAdminComponent,
    AjoutModifierNiveauComponent,
    AjoutModifierFiliereComponent,
    AjoutModifierClasseComponent,
    AdministrateurComponent,
    DetailNiveauComponent,
    DetailFiliereComponent,
    ImageDetailComponent,
    FourOhFourComponent,
    ModifierfiliereComponent,
    ModifierclasseComponent,
    AbonnementComponent,
    ListeDemandeAnnuleComponent,
    ListeDemandeValideComponent,
    ListeDemandeRejeteComponent,
    ListeDemandeRecuComponent,
    ListeDemandeEnCoursComponent,
    ListeAgentDisableComponent,
    ListeAgentEnableComponent,
    ListeGroupCotisationComponent,
    ListeBankComponent,
    ListeAdminComponent,
    ListeTypeBanqueComponent,
    DetailDemandeComponent,
    AssignAgentComponent,
    AjouteAdminComponent,
    AjouterAgentComponent,
    AjouterBanqueComponent,
    AjouterTypeBanqueComponent,
    ModifierBanqueComponent,
    ModifierTypeBanqueComponent,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
