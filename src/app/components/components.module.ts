import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { AdminNavComponent } from './admin-nav/admin-nav.component';
import { AgentNavComponent } from './agent-nav/agent-nav.component';
import { AdminSideComponent } from './admin-side/admin-side.component';
import { AgentSideComponent } from './agent-side/agent-side.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
  ],
  declarations: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    AdminNavComponent,
    AgentNavComponent,
    AdminSideComponent,
    AgentSideComponent
  ],
  exports: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    AdminNavComponent,
    AgentNavComponent,
    AdminSideComponent,
    AgentSideComponent

  ]
})
export class ComponentsModule { }
