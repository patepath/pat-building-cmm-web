import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProceedingComponent } from './admin-proceeding.component';

describe('AdminProceedingComponent', () => {
  let component: AdminProceedingComponent;
  let fixture: ComponentFixture<AdminProceedingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminProceedingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminProceedingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
