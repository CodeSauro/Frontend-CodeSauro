import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OneStarComponent } from './one-star.component';

describe('OneStarComponent', () => {
  let component: OneStarComponent;
  let fixture: ComponentFixture<OneStarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OneStarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OneStarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
