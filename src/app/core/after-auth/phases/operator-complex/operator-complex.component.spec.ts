import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperatorComplexComponent } from './operator-complex.component';

describe('OperatorComplexComponent', () => {
  let component: OperatorComplexComponent;
  let fixture: ComponentFixture<OperatorComplexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OperatorComplexComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OperatorComplexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
