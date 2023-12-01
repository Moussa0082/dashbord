import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeDemandeEnCoursComponent } from './liste-demande-en-cours.component';

describe('ListeDemandeEnCoursComponent', () => {
  let component: ListeDemandeEnCoursComponent;
  let fixture: ComponentFixture<ListeDemandeEnCoursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeDemandeEnCoursComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeDemandeEnCoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
