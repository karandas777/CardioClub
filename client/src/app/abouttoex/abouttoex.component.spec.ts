import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbouttoexComponent } from './abouttoex.component';

describe('AbouttoexComponent', () => {
  let component: AbouttoexComponent;
  let fixture: ComponentFixture<AbouttoexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbouttoexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbouttoexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
