import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeDemandeRejeteComponent } from './liste-demande-rejete.component';

describe('ListeDemandeRejeteComponent', () => {
  let component: ListeDemandeRejeteComponent;
  let fixture: ComponentFixture<ListeDemandeRejeteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeDemandeRejeteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeDemandeRejeteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
