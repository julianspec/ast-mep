import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalExpandChartComponent } from './total-expand-chart.component';

describe('TotalExpandChartComponent', () => {
  let component: TotalExpandChartComponent;
  let fixture: ComponentFixture<TotalExpandChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TotalExpandChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TotalExpandChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
