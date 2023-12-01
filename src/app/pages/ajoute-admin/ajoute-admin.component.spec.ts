import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouteAdminComponent } from './ajoute-admin.component';

describe('AjouteAdminComponent', () => {
  let component: AjouteAdminComponent;
  let fixture: ComponentFixture<AjouteAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjouteAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjouteAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
