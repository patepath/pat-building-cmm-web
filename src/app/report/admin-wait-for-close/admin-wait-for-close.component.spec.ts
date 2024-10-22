import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminWaitForCloseComponent } from './admin-wait-for-close.component';

describe('AdminWaitForCloseComponent', () => {
  let component: AdminWaitForCloseComponent;
  let fixture: ComponentFixture<AdminWaitForCloseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminWaitForCloseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminWaitForCloseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
