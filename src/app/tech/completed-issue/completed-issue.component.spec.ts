import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletedIssueComponent } from './completed-issue.component';

describe('CompletedIssueComponent', () => {
  let component: CompletedIssueComponent;
  let fixture: ComponentFixture<CompletedIssueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompletedIssueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompletedIssueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
