import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTableauComponent } from './admin-tableau.component';

describe('AdminTableauComponent', () => {
  let component: AdminTableauComponent;
  let fixture: ComponentFixture<AdminTableauComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminTableauComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminTableauComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
