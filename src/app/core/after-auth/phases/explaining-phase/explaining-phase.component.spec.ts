import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExplainingPhaseComponent } from './explaining-phase.component';

describe('ExplainingPhaseComponent', () => {
  let component: ExplainingPhaseComponent;
  let fixture: ComponentFixture<ExplainingPhaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExplainingPhaseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExplainingPhaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
