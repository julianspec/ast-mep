import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExampleFormValidationsComponent } from './example-form-validations.component';

describe('ExampleFormValidationsComponent', () => {
  let component: ExampleFormValidationsComponent;
  let fixture: ComponentFixture<ExampleFormValidationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExampleFormValidationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExampleFormValidationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
