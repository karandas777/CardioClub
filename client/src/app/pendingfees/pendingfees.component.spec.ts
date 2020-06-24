import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingfeesComponent } from './pendingfees.component';

describe('PendingfeesComponent', () => {
  let component: PendingfeesComponent;
  let fixture: ComponentFixture<PendingfeesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PendingfeesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingfeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
