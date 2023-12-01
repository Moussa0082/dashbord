import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierTypeBanqueComponent } from './modifier-type-banque.component';

describe('ModifierTypeBanqueComponent', () => {
  let component: ModifierTypeBanqueComponent;
  let fixture: ComponentFixture<ModifierTypeBanqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifierTypeBanqueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifierTypeBanqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
