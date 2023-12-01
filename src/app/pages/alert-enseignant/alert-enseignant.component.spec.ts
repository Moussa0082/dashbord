import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertEnseignantComponent } from './alert-enseignant.component';

describe('AlertEnseignantComponent', () => {
  let component: AlertEnseignantComponent;
  let fixture: ComponentFixture<AlertEnseignantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlertEnseignantComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlertEnseignantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
