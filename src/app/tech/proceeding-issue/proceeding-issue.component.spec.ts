import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProceedingIssueComponent } from './proceeding-issue.component';

describe('ProceedingIssueComponent', () => {
  let component: ProceedingIssueComponent;
  let fixture: ComponentFixture<ProceedingIssueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProceedingIssueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProceedingIssueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
