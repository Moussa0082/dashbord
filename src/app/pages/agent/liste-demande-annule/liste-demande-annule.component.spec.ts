import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeDemandeAnnuleComponent } from './liste-demande-annule.component';

describe('ListeDemandeAnnuleComponent', () => {
  let component: ListeDemandeAnnuleComponent;
  let fixture: ComponentFixture<ListeDemandeAnnuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeDemandeAnnuleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeDemandeAnnuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
