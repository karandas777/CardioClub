import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivemembersComponent } from './activemembers.component';

describe('ActivemembersComponent', () => {
  let component: ActivemembersComponent;
  let fixture: ComponentFixture<ActivemembersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivemembersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivemembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
