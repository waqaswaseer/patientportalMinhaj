import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CresultanalysisComponent } from './cresultanalysis.component';

describe('CresultanalysisComponent', () => {
  let component: CresultanalysisComponent;
  let fixture: ComponentFixture<CresultanalysisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CresultanalysisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CresultanalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
