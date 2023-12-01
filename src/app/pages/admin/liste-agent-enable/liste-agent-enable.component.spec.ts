import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeAgentEnableComponent } from './liste-agent-enable.component';

describe('ListeAgentEnableComponent', () => {
  let component: ListeAgentEnableComponent;
  let fixture: ComponentFixture<ListeAgentEnableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeAgentEnableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeAgentEnableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
