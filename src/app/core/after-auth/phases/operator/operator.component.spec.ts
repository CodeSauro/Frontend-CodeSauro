import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArithmeticOperatorComponent } from './operator.component';

describe('ArithmeticOperatorComponent', () => {
  let component: ArithmeticOperatorComponent;
  let fixture: ComponentFixture<ArithmeticOperatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArithmeticOperatorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArithmeticOperatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
