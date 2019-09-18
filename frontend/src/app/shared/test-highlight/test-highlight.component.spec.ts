import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestHighlightComponent } from './test-highlight.component';

describe('TestHighlightComponent', () => {
  let component: TestHighlightComponent;
  let fixture: ComponentFixture<TestHighlightComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestHighlightComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHighlightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
 