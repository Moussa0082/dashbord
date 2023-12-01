import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeBankComponent } from './liste-bank.component';

describe('ListeBankComponent', () => {
  let component: ListeBankComponent;
  let fixture: ComponentFixture<ListeBankComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeBankComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeBankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
