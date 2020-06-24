import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertboardComponent } from './alertboard.component';

describe('AlertboardComponent', () => {
  let component: AlertboardComponent;
  let fixture: ComponentFixture<AlertboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlertboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
