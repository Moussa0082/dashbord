import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutModifierAdminComponent } from './ajout-modifier-admin.component';

describe('AjoutModifierAdminComponent', () => {
  let component: AjoutModifierAdminComponent;
  let fixture: ComponentFixture<AjoutModifierAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjoutModifierAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjoutModifierAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
