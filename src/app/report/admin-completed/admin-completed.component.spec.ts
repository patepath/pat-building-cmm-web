import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCompletedComponent } from './admin-completed.component';

describe('AdminCompletedComponent', () => {
  let component: AdminCompletedComponent;
  let fixture: ComponentFixture<AdminCompletedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminCompletedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminCompletedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
