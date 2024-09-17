import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConditionalStructuresComplexComponent } from './conditional-structures-complex.component';

describe('ConditionalStructuresComplexComponent', () => {
  let component: ConditionalStructuresComplexComponent;
  let fixture: ComponentFixture<ConditionalStructuresComplexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConditionalStructuresComplexComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConditionalStructuresComplexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
