import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserinfosmComponent } from './userinfosm.component';

describe('UserinfosmComponent', () => {
  let component: UserinfosmComponent;
  let fixture: ComponentFixture<UserinfosmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserinfosmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserinfosmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
