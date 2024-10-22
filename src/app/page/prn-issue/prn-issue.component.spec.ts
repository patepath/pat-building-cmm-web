import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrnIssueComponent } from './prn-issue.component';

describe('PrnIssueComponent', () => {
  let component: PrnIssueComponent;
  let fixture: ComponentFixture<PrnIssueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrnIssueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrnIssueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
