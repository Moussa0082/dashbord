import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentSideComponent } from './agent-side.component';

describe('AgentSideComponent', () => {
  let component: AgentSideComponent;
  let fixture: ComponentFixture<AgentSideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgentSideComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgentSideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
