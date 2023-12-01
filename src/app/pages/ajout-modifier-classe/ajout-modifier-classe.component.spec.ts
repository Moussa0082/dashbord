import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutModifierClasseComponent } from './ajout-modifier-classe.component';

describe('AjoutModifierClasseComponent', () => {
  let component: AjoutModifierClasseComponent;
  let fixture: ComponentFixture<AjoutModifierClasseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjoutModifierClasseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjoutModifierClasseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
