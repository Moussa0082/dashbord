import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierfiliereComponent } from './modifierfiliere.component';

describe('ModifierfiliereComponent', () => {
  let component: ModifierfiliereComponent;
  let fixture: ComponentFixture<ModifierfiliereComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifierfiliereComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifierfiliereComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
