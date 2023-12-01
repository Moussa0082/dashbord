// import { Routes } from '@angular/router';

// import { EnseignantComponent } from 'app/pages/enseignant/enseignant.component';
// import { TableauDeBordComponent } from 'app/pages/tableau-de-bord/tableau-de-bord.component';
// import { ProfileComponent } from 'app/pages/profile/profile.component';
// import { EtudiantComponent } from 'app/pages/etudiant/etudiant.component';
// import { AlertEnseignantComponent } from 'app/pages/alert-enseignant/alert-enseignant.component';
// import { ConnexionComponent } from 'app/pages/connexion/connexion.component';
// import { AdministrateurComponent } from 'app/pages/administrateur/administrateur.component';
// import { DetailNiveauComponent } from 'app/pages/detail-niveau/detail-niveau.component';
// import { DetailFiliereComponent } from 'app/pages/detail-filiere/detail-filiere.component';
// import { AuthGuardService } from 'app/service/auth-guard.service';
// import { AbonnementComponent } from 'app/pages/abonnement/abonnement.component';
// // import { ConnexionComponent } from 'app/pages/connexion/connexion.component';

// export const AdminLayoutRoutes: Routes = [
 
//     { path: 'login',      component: ConnexionComponent },
//     { path: 'tableaudebord', canActivate : [AuthGuardService],     component: TableauDeBordComponent },
//     { path: 'profile',canActivate : [AuthGuardService],    component: ProfileComponent },
//     { path: 'enseignant',canActivate : [AuthGuardService],       component: EnseignantComponent },
//     { path: 'etudiant',canActivate : [AuthGuardService],      component: EtudiantComponent },
//     { path: 'admin',canActivate : [AuthGuardService],      component: AdministrateurComponent },
//     { path: 'alert-en', canActivate : [AuthGuardService],          component: AlertEnseignantComponent },
//     { path: 'abonnement', canActivate : [AuthGuardService],          component: AbonnementComponent },
//     { path: 'detail-niveau/:id',canActivate : [AuthGuardService],           component: DetailNiveauComponent },
//     { path: 'detail-filiere/:id',  canActivate : [AuthGuardService],         component: DetailFiliereComponent },
    
// ];



import { Routes } from '@angular/router';

import { EnseignantComponent } from 'app/pages/enseignant/enseignant.component';
import { TableauDeBordComponent } from 'app/pages/tableau-de-bord/tableau-de-bord.component';
import { ProfileComponent } from 'app/pages/profile/profile.component';
import { EtudiantComponent } from 'app/pages/etudiant/etudiant.component';
import { AlertEnseignantComponent } from 'app/pages/alert-enseignant/alert-enseignant.component';
import { ConnexionComponent } from 'app/pages/connexion/connexion.component';
import { AdministrateurComponent } from 'app/pages/administrateur/administrateur.component';
import { DetailNiveauComponent } from 'app/pages/detail-niveau/detail-niveau.component';
import { DetailFiliereComponent } from 'app/pages/detail-filiere/detail-filiere.component';
import { AuthGuardService } from 'app/service/auth-guard.service';
import { AbonnementComponent } from 'app/pages/abonnement/abonnement.component';
import { DetailDemandeComponent } from 'app/pages/agent/detail-demande/detail-demande.component';
import { ListeDemandeRecuComponent } from 'app/pages/agent/liste-demande-recu/liste-demande-recu.component';
import { ListeDemandeValideComponent } from 'app/pages/agent/liste-demande-valide/liste-demande-valide.component';
import { ListeDemandeRejeteComponent } from 'app/pages/agent/liste-demande-rejete/liste-demande-rejete.component';
import { ListeDemandeEnCoursComponent } from 'app/pages/agent/liste-demande-en-cours/liste-demande-en-cours.component';
import { ListeAgentDisableComponent } from 'app/pages/admin/liste-agent-disable/liste-agent-disable.component';
import { ListeAgentEnableComponent } from 'app/pages/admin/liste-agent-enable/liste-agent-enable.component';
import { ListeGroupCotisationComponent } from 'app/pages/liste-group-cotisation/liste-group-cotisation.component';
import { ListeBankComponent } from 'app/pages/liste-bank/liste-bank.component';
import { ListeAdminComponent } from 'app/pages/liste-admin/liste-admin.component';
import { ListeTypeBanqueComponent } from 'app/pages/liste-type-banque/liste-type-banque.component';
import { ListeDemandeAnnuleComponent } from 'app/pages/agent/liste-demande-annule/liste-demande-annule.component';
// import { ConnexionComponent } from 'app/pages/connexion/connexion.component';

export const AdminLayoutRoutes: Routes = [
 
    { path: 'login',      component: ConnexionComponent },
    { path: 'tableaudebord',   component: TableauDeBordComponent },
    // { path: 'profile',canActivate : [AuthGuardService],    component: ProfileComponent },
    // { path: 'enseignant',canActivate : [AuthGuardService],       component: EnseignantComponent },
    // { path: 'etudiant',canActivate : [AuthGuardService],      component: EtudiantComponent },
    // { path: 'admin',canActivate : [AuthGuardService],      component: AdministrateurComponent },
    // { path: 'alert-en', canActivate : [AuthGuardService],          component: AlertEnseignantComponent },
    // { path: 'abonnement', canActivate : [AuthGuardService],          component: AbonnementComponent },
    // { path: 'detail-niveau/:id',canActivate : [AuthGuardService],           component: DetailNiveauComponent },
    // { path: 'detail-filiere/:id',  canActivate : [AuthGuardService],         component: DetailFiliereComponent },
    

    { path: 'detail-demande/:id', component: DetailDemandeComponent },
    { path: 'tableaudebord',      component: TableauDeBordComponent },
    {path : 'demandes-recu', component : ListeDemandeRecuComponent},
    {path : 'demandes-valide', component : ListeDemandeValideComponent},
    {path : 'demandes-en-cours', component : ListeDemandeEnCoursComponent},
    {path:  'demandes-rejete', component:ListeDemandeRejeteComponent},
    {path: 'enable-agents', component:ListeAgentEnableComponent},
    {path: 'disable-agents', component:ListeAgentDisableComponent},
    {path: 'groupes-cotisation', component: ListeGroupCotisationComponent},
    {path: 'detail-ask', component:DetailDemandeComponent},
   {path:'bank', component:ListeBankComponent},
   {path: 'type-bank', component:ListeTypeBanqueComponent},
   {path: 'demande-annule', component:ListeDemandeAnnuleComponent},
   {path:'admins', component:ListeAdminComponent},


];
