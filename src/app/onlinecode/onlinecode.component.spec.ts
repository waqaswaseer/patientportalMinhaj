import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlinecodeComponent } from './onlinecode.component';

describe('OnlinecodeComponent', () => {
  let component: OnlinecodeComponent;
  let fixture: ComponentFixture<OnlinecodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnlinecodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnlinecodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
