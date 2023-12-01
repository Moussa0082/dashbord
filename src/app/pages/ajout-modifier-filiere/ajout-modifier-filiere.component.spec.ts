import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutModifierFiliereComponent } from './ajout-modifier-filiere.component';

describe('AjoutModifierFiliereComponent', () => {
  let component: AjoutModifierFiliereComponent;
  let fixture: ComponentFixture<AjoutModifierFiliereComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjoutModifierFiliereComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjoutModifierFiliereComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
