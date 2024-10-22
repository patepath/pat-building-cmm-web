import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaitForCloseComponent } from './wait-for-close.component';

describe('WaitForCloseComponent', () => {
  let component: WaitForCloseComponent;
  let fixture: ComponentFixture<WaitForCloseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WaitForCloseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WaitForCloseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
