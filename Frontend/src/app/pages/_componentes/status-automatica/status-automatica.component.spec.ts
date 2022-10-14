import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusAutomaticaComponent } from './status-automatica.component';

describe('StatusAutomaticaComponent', () => {
  let component: StatusAutomaticaComponent;
  let fixture: ComponentFixture<StatusAutomaticaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatusAutomaticaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusAutomaticaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
