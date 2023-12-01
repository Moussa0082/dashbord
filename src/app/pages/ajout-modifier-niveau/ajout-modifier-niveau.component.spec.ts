import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutModifierNiveauComponent } from './ajout-modifier-niveau.component';

describe('AjoutModifierNiveauComponent', () => {
  let component: AjoutModifierNiveauComponent;
  let fixture: ComponentFixture<AjoutModifierNiveauComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjoutModifierNiveauComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjoutModifierNiveauComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
