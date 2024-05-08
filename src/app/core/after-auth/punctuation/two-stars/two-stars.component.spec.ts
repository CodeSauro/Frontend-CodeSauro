import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TwoStarsComponent } from './two-stars.component';

describe('TwoStarsComponent', () => {
  let component: TwoStarsComponent;
  let fixture: ComponentFixture<TwoStarsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TwoStarsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TwoStarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
