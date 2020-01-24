import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BigNumberCard2SpacesComponent } from './big-number-card-2-spaces.component';

describe('BigNumberCardComponent', () => {
  let component: BigNumberCard2SpacesComponent;
  let fixture: ComponentFixture<BigNumberCard2SpacesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BigNumberCard2SpacesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BigNumberCard2SpacesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
