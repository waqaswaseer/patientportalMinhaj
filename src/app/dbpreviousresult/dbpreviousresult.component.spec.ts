import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DbpreviousresultComponent } from './dbpreviousresult.component';

describe('DbpreviousresultComponent', () => {
  let component: DbpreviousresultComponent;
  let fixture: ComponentFixture<DbpreviousresultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DbpreviousresultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DbpreviousresultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
