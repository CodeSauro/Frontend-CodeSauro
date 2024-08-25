import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConditionalStructuresComponent } from './conditional-structures.component';

describe('ConditionalStructuresComponent', () => {
  let component: ConditionalStructuresComponent;
  let fixture: ComponentFixture<ConditionalStructuresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConditionalStructuresComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConditionalStructuresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
