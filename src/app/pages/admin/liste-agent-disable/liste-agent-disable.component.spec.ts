import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeAgentDisableComponent } from './liste-agent-disable.component';

describe('ListeAgentDisableComponent', () => {
  let component: ListeAgentDisableComponent;
  let fixture: ComponentFixture<ListeAgentDisableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeAgentDisableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeAgentDisableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
