import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentvisitComponent } from './currentvisit.component';

describe('CurrentvisitComponent', () => {
  let component: CurrentvisitComponent;
  let fixture: ComponentFixture<CurrentvisitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrentvisitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentvisitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
