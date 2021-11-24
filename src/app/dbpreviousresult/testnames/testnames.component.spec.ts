import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestnamesComponent } from './testnames.component';

describe('TestnamesComponent', () => {
  let component: TestnamesComponent;
  let fixture: ComponentFixture<TestnamesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestnamesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestnamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
