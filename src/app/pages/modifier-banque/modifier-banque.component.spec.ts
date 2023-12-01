import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierBanqueComponent } from './modifier-banque.component';

describe('ModifierBanqueComponent', () => {
  let component: ModifierBanqueComponent;
  let fixture: ComponentFixture<ModifierBanqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifierBanqueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifierBanqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
