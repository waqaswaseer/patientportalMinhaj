import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllvisitsComponent } from './allvisits.component';

describe('AllvisitsComponent', () => {
  let component: AllvisitsComponent;
  let fixture: ComponentFixture<AllvisitsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllvisitsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllvisitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
