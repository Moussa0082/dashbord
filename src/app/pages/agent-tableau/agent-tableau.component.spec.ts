import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentTableauComponent } from './agent-tableau.component';

describe('AgentTableauComponent', () => {
  let component: AgentTableauComponent;
  let fixture: ComponentFixture<AgentTableauComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgentTableauComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgentTableauComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
