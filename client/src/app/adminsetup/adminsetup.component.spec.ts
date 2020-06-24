import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminsetupComponent } from './adminsetup.component';

describe('AdminsetupComponent', () => {
  let component: AdminsetupComponent;
  let fixture: ComponentFixture<AdminsetupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminsetupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminsetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
