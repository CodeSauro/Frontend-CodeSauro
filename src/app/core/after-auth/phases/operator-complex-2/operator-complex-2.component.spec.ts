import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperatorComplex2Component } from './operator-complex-2.component';

describe('OperatorComplex2Component', () => {
  let component: OperatorComplex2Component;
  let fixture: ComponentFixture<OperatorComplex2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OperatorComplex2Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OperatorComplex2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
