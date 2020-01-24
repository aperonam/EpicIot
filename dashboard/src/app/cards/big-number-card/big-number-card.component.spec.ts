import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BigNumberCardComponent } from './big-number-card.component';

describe('BigNumberCardComponent', () => {
  let component: BigNumberCardComponent;
  let fixture: ComponentFixture<BigNumberCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BigNumberCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BigNumberCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
