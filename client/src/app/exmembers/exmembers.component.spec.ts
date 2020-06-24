import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExmembersComponent } from './exmembers.component';

describe('ExmembersComponent', () => {
  let component: ExmembersComponent;
  let fixture: ComponentFixture<ExmembersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExmembersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExmembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
