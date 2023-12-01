import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeGroupCotisationComponent } from './liste-group-cotisation.component';

describe('ListeGroupCotisationComponent', () => {
  let component: ListeGroupCotisationComponent;
  let fixture: ComponentFixture<ListeGroupCotisationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeGroupCotisationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeGroupCotisationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
