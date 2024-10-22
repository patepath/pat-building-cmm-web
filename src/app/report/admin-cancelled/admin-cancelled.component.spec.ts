import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCancelledComponent } from './admin-cancelled.component';

describe('AdminCancelledComponent', () => {
  let component: AdminCancelledComponent;
  let fixture: ComponentFixture<AdminCancelledComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminCancelledComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminCancelledComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
