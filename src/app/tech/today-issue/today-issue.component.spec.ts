import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodayIssueComponent } from './today-issue.component';

describe('TodayIssueComponent', () => {
  let component: TodayIssueComponent;
  let fixture: ComponentFixture<TodayIssueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodayIssueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodayIssueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
