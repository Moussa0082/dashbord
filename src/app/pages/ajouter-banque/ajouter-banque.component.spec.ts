import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterBanqueComponent } from './ajouter-banque.component';

describe('AjouterBanqueComponent', () => {
  let component: AjouterBanqueComponent;
  let fixture: ComponentFixture<AjouterBanqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjouterBanqueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjouterBanqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
