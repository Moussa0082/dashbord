import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierclasseComponent } from './modifierclasse.component';

describe('ModifierclasseComponent', () => {
  let component: ModifierclasseComponent;
  let fixture: ComponentFixture<ModifierclasseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifierclasseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifierclasseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
